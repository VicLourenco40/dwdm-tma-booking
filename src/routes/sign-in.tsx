export default function SignIn() {
  return (
    <>
      <h1>Sign In</h1>

      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" minLength={6} required />

        <input type="submit" value="Sign In" />
      </form>
    </>
  );
}
