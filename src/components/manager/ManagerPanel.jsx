import { useState } from "react";
import GenerateInvoiceComponent from "../invoice/GenerateInvoiceComponent";
import EditProfileComponent from "../common/EditProfileComponent";

const ManagerPanel = () => {
  const [selectedComponent, setSelectedComponent] = useState("invoice");

  // Function to render selected component
  const renderComponent = () => {
    switch (selectedComponent) {
      case "invoice":
        return <GenerateInvoiceComponent />;
      case "edit-profile":
        return <EditProfileComponent />;
      default:
        return null;
    }
  };
  return (
    <section className="bg-gradient-to-br from-[#bd2ad6] to-[#35196a] min-h-[90vh] overflow-hidden pl-4 border-4 relative">
      {/* Left Sidebar */}
      <div className="absolute left-5 top-0  mt-36 w-1/4 bg-gray-800 text-white p-4 space-y-4">
        <button
          className="w-full p-2 bg-gray-700 rounded hover:cursor-pointer"
          onClick={() => setSelectedComponent("invoice")}
        >
          Invoice
        </button>
        <button
          className="w-full p-2 bg-gray-700 rounded hover:cursor-pointer"
          onClick={() => setSelectedComponent("edit-profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* Right Content */}
      <div className="absolute left-1/4 top-0 right-3 mt-28 ml-10 ">
        {renderComponent()}
      </div>
    </section>
  );
};

export default ManagerPanel;
