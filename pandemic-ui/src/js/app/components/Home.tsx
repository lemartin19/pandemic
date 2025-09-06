export function Home() {
  return (
    <div className="Home p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Welcome to the Pandemic Boardgame!</h2>
      <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
        Pandemic is a cooperative board game where players work together to manage a global
        pandemic.
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        This is an experimental project - to learn more about it&lsquo;s development or report any
        issues, see <a href="https://github.com/lemartin19/pandemic" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">the GitHub repository</a>.
      </p>
    </div>
  );
}
