const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contactList = JSON.parse(data);
  return contactList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => Number(id) === Number(contactId));
  if (!result) {
    return null;
  }
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => Number(id) === Number(contactId));
  if (idx === -1) {
    return null;
  }
  const removedContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
