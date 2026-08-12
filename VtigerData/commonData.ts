export let commonData = {
  login: {
    baseUrl: "http://localhost:8888/",
    username: "admin",
    password: "admin",
  },

  createNewContact: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    salutation: "Mr.",
    leadSource: "Employee",
    fax: "123-456-7890",
    mobile: "123-456-7890",
    selectAccounts: {
      url:"http://localhost:8888/index.php?module=Accounts&action=Popup&popuptype=specific_contact_account_address&form=TasksEditView&form_submit=false&fromlink=&recordid=",
        accountName: "Rohit"
      }

  },
};
