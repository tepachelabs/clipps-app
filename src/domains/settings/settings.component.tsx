import React, { memo } from "react";
import { Header } from "../../components";

const SettingsComponent: React.FC = () => {
  return (
    <div>
      <Header />
      <p>Settings page</p>
    </div>
  );
};

export const Settings = memo(SettingsComponent);
