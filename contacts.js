const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId.toString());
  if (!contact) {
    return `Product with id-${contactId} not found`;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filterContacts = contacts.filter(
    (contact) => contact.id !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
  return listContacts();
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
