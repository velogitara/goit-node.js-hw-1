const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const { listContacts, getContactById, addContact, removeContact } = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const list = await listContacts();
      console.log(list);
      break;

    case 'get':
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`contact with id ${id} not found`);
      }
      console.log(contact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removeContactById = await removeContact(id);
      console.log(removeContactById);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);

// invokeAction({ action: 'getList' });

// const id = '2';

// invokeAction({ action: 'getById', id });

// const newContact = {
//   name: 'Lessi',
//   email: 'someEmail@gmail.com',
//   phone: '(237) 854-4565',
// };

// invokeAction({
//   action: 'addContact',
//   name: 'Lessi',
//   email: 'someEmail@gmail.com',
//   phone: '(237) 854-4565',
// });

// const updateId = '03800f5b-51b2-498f-b7aa-3a2379d7040a';

// invokeAction({ action: 'removeById', id: updateId });
