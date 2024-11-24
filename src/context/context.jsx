import React from "react";
import UserProvider from "./user.provider";
import PublicationsProvider from "./publication.provider";

const TuChambitaProvider = ({ children }) => {
  return (
    <UserProvider>
      <PublicationsProvider>
        {children}
      </PublicationsProvider>
    </UserProvider>
  );
};

export default TuChambitaProvider;
