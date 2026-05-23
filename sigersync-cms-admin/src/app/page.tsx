import { CategoriesManager } from '../components/categories/CategoriesManager';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                SigerSync CMS
              </h1>
              <span className="ml-3 text-sm text-gray-500">
                Admin Dashboard
              </span>
            </div>
            <nav className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Dashboard
              </a>
              <a
                href="#"
                className="text-blue-600 font-medium"
              >
                Categories
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Destinations
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Users
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <CategoriesManager />
        </div>
      </main>
    </div>
  );
}
