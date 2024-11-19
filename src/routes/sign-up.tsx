import { useEffect, useState } from "react";

type Country = {
  id: string;
  name: string;
}

export default function SignUp() {
  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    await fetch('https://api-tma-2024-production.up.railway.app/countries')
      .then(response => response.json())
      .then(data => setCountries(data.countries));
  }

  const [countries, setCountries] = useState<Country[]>([]);

  return (
    <>
      <h1>Sign Up</h1>

      <form>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' />

        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />

        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />

        <label htmlFor='birth-date'>Birth date</label>
        <input type='date' name='birth-date' id='birth-date' />

        <label htmlFor='country'>Country</label>
        <select name='country' id='country'>
          <option value=''>Select</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>

        <label htmlFor="terms">Terms and conditions</label>
        <input type="checkbox" name="terms" id="terms" />

        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}
