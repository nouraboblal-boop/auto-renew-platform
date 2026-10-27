import test from 'node:test';
import assert from 'node:assert/strict';
import { estimateCost, SERVICES, money } from '../src/lib/catalog.mjs';
import { normalizeWhatsAppNumber, buildWhatsAppUrl, buildBookingMessage, isContactPhoneValid } from '../src/lib/booking.mjs';
const selection = { serviceId: 'ppf', packageId: 'essential', vehicleId: 'sedan' };
test('services catalogue contains four expected services', () => assert.deepEqual(SERVICES.map(s => s.id), ['ppf','vinyl','ev','dilink']));
test('basic sedan estimate', () => assert.equal(estimateCost(selection), 550));
test('SUV changes the estimate', () => assert.equal(estimateCost({...selection, vehicleId: 'suv'}), 660));
test('reject unknown selections rather than silently guessing', () => assert.throws(() => estimateCost({...selection, packageId: 'invalid'})));
test('money formats integers', () => assert.equal(money(1250), '1,250'));
test('WhatsApp number strict E.164-ish 8-15 digits', () => {
  assert.equal(normalizeWhatsAppNumber('+963 912 345 678'), '963912345678');
  assert.equal(normalizeWhatsAppNumber('00963912345678'), null);
  assert.equal(normalizeWhatsAppNumber('not-a-number'), null);
  assert.equal(normalizeWhatsAppNumber(''), null);
});
test('WhatsApp deep link safely encodes Arabic and newline', () => {
  const link = buildWhatsAppUrl('963912345678', 'مرحباً\nسيارة & PPF');
  assert.ok(link?.startsWith('https://wa.me/963912345678?text='));
  assert.equal(new URL(link).searchParams.get('text'), 'مرحباً\nسيارة & PPF');
});
test('no link if number missing', () => assert.equal(buildWhatsAppUrl('', 'hello'), null));
test('contact phone validation', () => { assert.equal(isContactPhoneValid('+963 912 345 678'),true); assert.equal(isContactPhoneValid('abc123'),false); });
test('booking message includes all fields and does not assert confirmation', () => {
  const message = buildBookingMessage({...selection, name:'نـور', contactPhone:'0912345678', carModel:'BYD Song Plus', preferredDate:'2026-11-10'});
  assert.match(message, /BYD Song Plus/);
  assert.match(message, /2026-11-10/);
  assert.match(message, /550 USD/);
  assert.match(message, /لا يتأكد إلا بعد رد المركز/);
});
