import { useState } from "react";
import CreateExpenseComponent from "../expense/CreateExpenseComponent";
import GenerateInvoiceComponent from "../invoice/GenerateInvoiceComponent";
import EditProfileComponent from "../common/EditProfileComponent";
import ChangePasswordComponent from "../common/ChangePasswordComponent";
import ExpenseListComponent from "../expense/ExpenseListComponent";
import ExpenseGraphComponent from "../expense/ExpenseGraphComponent";

const EmployeePanel = () => {
  const [selectedComponent, setSelectedComponent] = useState("expenses");

  // Function to render selected component
  const renderComponent = () => {
    switch (selectedComponent) {
      case "expenses":
        console.log("expense is called...");
        return <CreateExpenseComponent />;
      case "status":
        return <ExpenseListComponent />;

      case "expense-graph":
        return <ExpenseGraphComponent />;

      case "invoice":
        return <GenerateInvoiceComponent />;

      case "edit-profile":
        return <EditProfileComponent />;

      case "change-password":
        return <ChangePasswordComponent />;
      default:
        return null;
    }
  };
  return (
    <section className="bg-gradient-to-br from-[#096590] via-[#623874] to-[#650ee8] min-h-[90vh] overflow-hidden pl-4 border-4 relative">
      {/* Left Sidebar */}
      <div className="absolute left-5 top-0  mt-36 w-1/4 bg-gradient-to-br from-[#266080] via-[#34a1b2] to-[#1e5a6d] text-white p-4 space-y-4">
        <button
          className="w-full p-2 bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] rounded hover:cursor-pointer"
          onClick={() => setSelectedComponent("expenses")}
        >
          Expenses
        </button>
        <button
          className="w-full p-2  bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] rounded hover:cursor-pointer"
          onClick={() => setSelectedComponent("status")}
        >
          Status
        </button>
        <button
          className="w-full p-2  bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] rounded hover:cursor-pointer"
          onClick={() => setSelectedComponent("expense-graph")}
        >
          Graph
        </button>
        <button
          className="w-full p-2  bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] rounded hover:cursor-pointer"
          onClick={() => setSelectedComponent("invoice")}
        >
          Invoice
        </button>
        <button
          className="w-full p-2  bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] rounded hover:cursor-pointer"
          onClick={() => setSelectedComponent("edit-profile")}
        >
          Edit Profile
        </button>
        <button
          className="w-full p-2  bg-gradient-to-r from-[#341d8f] via-[#117d66] to-[#661557] rounded hover:cursor-pointer"
          onClick={() => setSelectedComponent("change-password")}
        >
          Change Password
        </button>
      </div>

      {/* Right Content */}
      <div className="absolute left-1/4 top-0 right-3 mt-28 ml-10 ">
        {renderComponent()}
      </div>
    </section>
  );
};

export default EmployeePanel;
