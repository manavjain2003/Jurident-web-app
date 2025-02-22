import React, { useState, useEffect } from "react";

const TeamPage = () => {
  const [user, setUser] = useState({ name: "", email: "", contact: "" });
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }

    
    fetch("/api/team-members") // Api here
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.error("Error fetching team members:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b20] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto mt-8 bg-[#10102b] p-6 rounded-lg shadow-lg">
        <button className="text-white flex items-center mb-4">
          <span className="mr-2 text-lg">&#8592;</span> <span className="text-yellow-400">My Teams</span>
        </button>
        <h2 className="text-xl font-semibold text-white mb-4">Current User</h2>
        <div className="p-4 rounded-lg">
          <p className="flex justify-between"><strong className="text-white">Name:</strong> <span className="text-gray-400">{user.name}</span></p>
          <p className="flex justify-between"><strong className="text-white">e-mail:</strong> <span className="text-gray-400">{user.email}</span></p>
          <p className="flex justify-between"><strong className="text-white">Contact no:</strong> <span className="text-gray-400">{user.contact}</span></p>
        </div>
        <h2 className="text-lg font-semibold text-white mt-6">Team Members</h2>
        {teamMembers.length > 0 ? (
          <ul className="text-gray-400">
            {teamMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Currently there is no Team Member</p>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-white text-black px-6 py-2 rounded-lg shadow-lg hover:bg-gray-200">
          Manage Team
        </button>
      </div>
    </div>
  );
};

export default TeamPage;
