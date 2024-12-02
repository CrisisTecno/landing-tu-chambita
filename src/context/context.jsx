import React from "react";
import UserProvider from "./user.provider";
import PublicationsProvider from "./publication.provider";
import ContactsContext from "./contacs.provider";
import { MessagesProvider } from "./messages.provider"; 

const TuChambitaProvider = ({ children }) => {
  return (
    <UserProvider>
      <MessagesProvider>
        <PublicationsProvider>
          <ContactsContext>{children}</ContactsContext>
        </PublicationsProvider>
      </MessagesProvider>
    </UserProvider>
  );
};

export default TuChambitaProvider;
