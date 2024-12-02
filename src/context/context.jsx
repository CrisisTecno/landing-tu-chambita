import React from "react";
import UserProvider from "./user.provider";
import PublicationsProvider from "./publication.provider";
import ContactsContext from "./contacs.provider";

const TuChambitaProvider = ({ children }) => {
  return (
    <UserProvider>
      <PublicationsProvider>
        <ContactsContext>
        {children}
        </ContactsContext>
      </PublicationsProvider>
    </UserProvider>
  );
};

export default TuChambitaProvider;
