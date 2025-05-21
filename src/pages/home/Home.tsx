const Home = () => {
  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-130px)]">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-3xl w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Student Management
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Welcome to the administrative panel. From here you can manage
            students, courses, enrollments and grades efficiently and securely.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300 cursor-pointer">
              Go to Control Panel
            </button>
            <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-md transition duration-300 cursor-pointer">
              View Reports
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Student Management. All rights
          reserved.
        </div>
      </footer>
    </>
  );
};

export default Home;
