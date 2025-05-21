const emitter = require('./EventEmitter');
const Logger = require('../utils/Logger');

// Mock email sender
function mockSendEmail(user, book) {
  console.log(`[📧 MOCK EMAIL] Sent to ${user.email}: You borrowed "${book.title}".`);
}

// Subscribe to bookBorrowed event
emitter.on('bookBorrowed', (book, user) => {
  Logger.log(`Event: Book "${book.title}" borrowed by ${user.name || user.email}`);

  mockSendEmail(user, book);

  // later extend this to:
  // - send real emails
  // - notify analytics
  // - write to audit logs
});
