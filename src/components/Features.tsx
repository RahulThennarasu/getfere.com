import { Container, Zap, Database, Activity } from 'lucide-react';
import containersImage from 'figma:asset/999f6f914bbadb0e9e28d77438b5adab273fc4e1.png';
import requestsImage from 'figma:asset/6e2f7e302fb7ec61e0cf389583b7ec13ca84b89e.png';
import databaseImage from 'figma:asset/b1bd1acade6530cce4950c28933f5b20849f497d.png';

export function Features() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Feature 1 */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full mb-6 border border-black/10">
                <Container className="w-4 h-4" />
                <span className="text-sm">Container Management</span>
              </div>
              <h2 className="text-5xl md:text-6xl mb-6 leading-tight">
                Visualize your services.
              </h2>
              <p className="text-lg text-black/60 mb-6">
                Get a complete overview of all your containers, their health status, and connections. Monitor resource usage and logs in real-time.
              </p>
              <a href="#" className="text-black/60 hover:text-black inline-flex items-center gap-2">
                Learn more →
              </a>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl border border-black/10">
              <img src={containersImage} alt="Container overview" className="w-full" />
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl border border-black/10">
              <img src={requestsImage} alt="Request tracking" className="w-full" />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full mb-6 border border-black/10">
                <Activity className="w-4 h-4" />
                <span className="text-sm">Request Tracking</span>
              </div>
              <h2 className="text-5xl md:text-6xl mb-6 leading-tight">
                Track every request.
              </h2>
              <p className="text-lg text-black/60 mb-6">
                Monitor HTTP requests across your services. See response times, status codes, and debug issues with detailed request history.
              </p>
              <a href="#" className="text-black/60 hover:text-black inline-flex items-center gap-2">
                Learn more →
              </a>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full mb-6 border border-black/10">
                <Database className="w-4 h-4" />
                <span className="text-sm">Database Explorer</span>
              </div>
              <h2 className="text-5xl md:text-6xl mb-6 leading-tight">
                Manage your data.
              </h2>
              <p className="text-lg text-black/60 mb-6">
                Browse and query your databases directly from the interface. Support for PostgreSQL, MongoDB, and more.
              </p>
              <a href="#" className="text-black/60 hover:text-black inline-flex items-center gap-2">
                Learn more →
              </a>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl border border-black/10">
              <img src={databaseImage} alt="Database management" className="w-full" />
            </div>
          </div>
        </div>

        {/* Simple feature grid */}
        <div className="bg-white/30 rounded-2xl p-12 border border-black/10">
          <h3 className="text-4xl md:text-5xl mb-12 text-center">
            Everything you need.
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Zap className="w-8 h-8 mb-4" />
              <h4 className="text-xl mb-2">Lightning fast</h4>
              <p className="text-black/60">Real-time updates and monitoring without lag.</p>
            </div>
            <div>
              <Container className="w-8 h-8 mb-4" />
              <h4 className="text-xl mb-2">Multi-platform</h4>
              <p className="text-black/60">Works with Docker, Kubernetes, and more.</p>
            </div>
            <div>
              <Database className="w-8 h-8 mb-4" />
              <h4 className="text-xl mb-2">Any database</h4>
              <p className="text-black/60">Connect to PostgreSQL, MongoDB, Redis, and others.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
