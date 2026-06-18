import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  generateDonationReference,
  validateInitializePayload,
  validateVerifiedTransaction,
} from '../app/api/paystack/paystack-utils.ts'

test('initialize validation rejects unsafe or incomplete donation payloads', () => {
  const validPayload = {
    amount: '50000',
    firstName: 'Adebayo',
    lastName: 'Okafor',
    email: 'donor@example.com',
    phone: '+2348000000000',
    message: 'For YYE',
  }

  assert.deepEqual(validateInitializePayload({ ...validPayload, amount: 'abc' }), {
    ok: false,
    error: 'Donation amount must be at least ₦1,000.',
  })
  assert.deepEqual(validateInitializePayload({ ...validPayload, amount: '999' }), {
    ok: false,
    error: 'Donation amount must be at least ₦1,000.',
  })
  assert.deepEqual(validateInitializePayload({ ...validPayload, firstName: '' }), {
    ok: false,
    error: 'Please enter your first and last name.',
  })
  assert.deepEqual(validateInitializePayload({ ...validPayload, lastName: '' }), {
    ok: false,
    error: 'Please enter your first and last name.',
  })
  assert.deepEqual(validateInitializePayload({ ...validPayload, email: 'bad-email' }), {
    ok: false,
    error: 'Please enter a valid email address.',
  })
})

test('initialize validation normalizes a valid donation and converts naira to kobo', () => {
  const result = validateInitializePayload({
    amount: '50000',
    firstName: '  Adebayo ',
    lastName: ' Okafor ',
    email: ' donor@example.com ',
    phone: ' +2348000000000 ',
    message: ' For YYE ',
  })

  assert.equal(result.ok, true)
  assert.equal(result.value.amount, 50000)
  assert.equal(result.value.amountKobo, 5000000)
  assert.equal(result.value.fullName, 'Adebayo Okafor')
  assert.equal(result.value.email, 'donor@example.com')
})

test('generated Paystack references are YYE donation references and Paystack-safe', () => {
  const reference = generateDonationReference()

  assert.match(reference, /^YYE-donation-\d+-[A-Z0-9]+$/)
  assert.equal(reference.includes('_'), false)
})

test('verification rejects edge cases that can fake or tamper with payment success', () => {
  const successfulTransaction = {
    status: 'success',
    currency: 'NGN',
    amount: 5000000,
    metadata: { expected_amount_kobo: 5000000 },
  }

  assert.deepEqual(validateVerifiedTransaction({ ...successfulTransaction, status: 'failed' }), {
    ok: false,
    error: 'Payment was not successful.',
  })
  assert.deepEqual(validateVerifiedTransaction({ ...successfulTransaction, currency: 'USD' }), {
    ok: false,
    error: 'Payment currency is invalid.',
  })
  assert.deepEqual(validateVerifiedTransaction({
    ...successfulTransaction,
    amount: 100000,
  }), {
    ok: false,
    error: 'Payment amount could not be verified.',
  })
  assert.deepEqual(validateVerifiedTransaction({
    ...successfulTransaction,
    metadata: {},
  }), {
    ok: false,
    error: 'Payment amount could not be verified.',
  })
  assert.deepEqual(validateVerifiedTransaction(successfulTransaction), {
    ok: true,
    amountKobo: 5000000,
  })
})

test('Paystack secret key is only used in server routes, never in client code', () => {
  const donateForm = readFileSync('components/DonateForm.tsx', 'utf8')
  const initializeRoute = readFileSync('app/api/paystack/initialize/route.ts', 'utf8')
  const verifyRoute = readFileSync('app/api/paystack/verify/route.ts', 'utf8')
  const envExample = readFileSync('.env.example', 'utf8')

  assert.equal(donateForm.includes('PAYSTACK_SECRET_KEY'), false)
  assert.equal(donateForm.includes('NEXT_PUBLIC_PAYSTACK'), false)
  assert.equal(envExample.includes('NEXT_PUBLIC_PAYSTACK_SECRET_KEY'), false)
  assert.equal(initializeRoute.includes('process.env.PAYSTACK_SECRET_KEY'), true)
  assert.equal(verifyRoute.includes('process.env.PAYSTACK_SECRET_KEY'), true)
})
