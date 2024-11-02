import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    const formData = {
      email: email,
      studentID: studentId,
      password: password,
    };
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          window.location.href = '/logged/home';
        }
      });

  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-950">
        <img
            src = './backgroundGear.svg'
            height={800}
            width={800}
            className= "absolute top-0 left-0 w-auto h-full object-contain transform -translate-y-1/2 -translate-x-1/2 max-w-md md:max-w-2xl lg:max-w-xl"
          />
          <img
            src = './backgroundGear.svg'
            height={800}
            width={800}
            className= "absolute top-0 right-0 w-auto h-full object-contain transform -translate-y-1/2 translate-x-1/2 max-w-md md:max-w-2xl lg:max-w-xl"
          />

        <form
          onSubmit={handleSubmit}
          className="bg-purple-600 p-6 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl text-yellow-400 font-bold mb-6 text-center">Register</h2>

          <label htmlFor="credentials-email" className="block mb-2 text-yellow-400">
            School Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="text-black w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label htmlFor="credentials-StudentID" className="block mb-2 text-yellow-400">
            Student ID
            <input
              type="number"
              name="studentid"
              placeholder="Student ID"
              className="text-black w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              onChange={(e) => setStudentId(e.target.value)}
            />
          </label>

          <label htmlFor="credentials-password" className="block mb-4 text-yellow-400">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="text-black w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label htmlFor="credentials-confirm-password" className="block mb-4 text-yellow-400">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="text-black w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="text-[#7c1d1d] mb-4 font-bold">{error}</p>}

          <input
            type="submit"
            value="Register"
            className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-purple-200 transition-colors cursor-pointer mb-4"
          />
        </form>
      </div>
    </>
  );
}
