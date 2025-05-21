import studentLogo from "../assets/student.svg";

const NavBar = () => {
  return (
    <div className="flex p-2 px-10 shadow-md justify-between items-center">
      <div className="flex gap-4 items-center">
        <img src={studentLogo} alt="student logo" className="w-12" />
        <h1 className="text-2xl font-bold">Student Management</h1>
      </div>

      <div className="flex gap-5 items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer transition duration-300">
          Login
        </button>
        <button className="bg-[#FABC3D] hover:bg-[#E89D04] text-white font-bold py-2 px-4 rounded-lg cursor-pointer transition duration-300">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NavBar;
