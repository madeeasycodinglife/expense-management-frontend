import expenseIllustration from "../assets/expense-illustration.webp";

const Home = () => {
  return (
    <section className="bg-gray-50 min-h-[90vh] flex items-center justify-center px-6 md:px-12">
      <div className="container mx-auto flex flex-col pt-28 md:flex-row items-center justify-between">
        {/* Left Side - Text Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Take Control of Your{" "}
            <span className="text-indigo-600">Expenses</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your finances effortlessly with our smart expense tracker.
            Get real-time insights, track your spending, and save for the
            future.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:cursor-pointer">
            Get Started
          </button>
        </div>

        {/* Right Side - Illustration/Image */}
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src={expenseIllustration}
            alt="Expense Management Illustration"
            className="max-w-xs md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
