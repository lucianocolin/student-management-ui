const Home = () => {
  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-3xl w-full">
          <h1
            className="text-4xl font-bold text-gray-900 mb-4"
            data-testid="home-title"
          >
            Welcome, Student
          </h1>
          <p className="text-lg text-gray-700 mb-6" data-testid="home-msg">
            Access your academic information easily. Here you can review your
            grades, track your tariff payments, and stay informed about your
            academic progress.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition duration-300">
              View Grades
            </button>
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow-md transition duration-300">
              Tariff Status
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
