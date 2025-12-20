"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Tab = "overview" | "creators" | "brands" | "contacts" | "waitlist";

type Creator = {
  id: string;
  name: string;
  email: string;
  portfolio?: string;
  niches?: string;
  message?: string;
  createdAt: string;
};

type Brand = {
  id: string;
  company: string;
  contact: string;
  email: string;
  jobTitle?: string;
  industry?: string;
  message?: string;
  createdAt: string;
};

type Contact = {
  id: string;
  name?: string;
  email: string;
  type: string;
  message?: string;
  createdAt: string;
};

type WaitlistEntry = {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [counts, setCounts] = useState({ creators: 0, brands: 0, contacts: 0, waitlist: 0 });
  const [creators, setCreators] = useState<Creator[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function fetchData() {
    setLoading(true);
    try {
      if (tab === "overview") {
        const res = await fetch("/api/admin/data");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setCounts(data);
      } else if (tab === "creators") {
        const res = await fetch("/api/admin/data?type=creators");
        const data = await res.json();
        setCreators(data);
      } else if (tab === "brands") {
        const res = await fetch("/api/admin/data?type=brands");
        const data = await res.json();
        setBrands(data);
      } else if (tab === "contacts") {
        const res = await fetch("/api/admin/data?type=contacts");
        const data = await res.json();
        setContacts(data);
      } else if (tab === "waitlist") {
        const res = await fetch("/api/admin/data?type=waitlist");
        const data = await res.json();
        setWaitlist(data);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-brand-black">
      <header className="border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-text-primary">Bragnetic Admin</h1>
          <button onClick={handleLogout} className="btn btn-outline-light text-sm">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex gap-2 mb-6 flex-wrap">
          {(["overview", "creators", "brands", "contacts", "waitlist"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-brand-yellow text-brand-black"
                  : "bg-surface-dark text-text-secondary hover:text-text-primary"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>

        {loading ? (
          <div className="text-text-secondary">Loading...</div>
        ) : (
          <>
            {tab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                  label="Creator Applications"
                  value={counts.creators}
                  onClick={() => setTab("creators")}
                />
                <StatCard
                  label="Brand Enquiries"
                  value={counts.brands}
                  onClick={() => setTab("brands")}
                />
                <StatCard
                  label="Contact Messages"
                  value={counts.contacts}
                  onClick={() => setTab("contacts")}
                />
                <StatCard
                  label="Academy Waitlist"
                  value={counts.waitlist}
                  onClick={() => setTab("waitlist")}
                />
              </div>
            )}

            {tab === "creators" && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-text-primary">
                  Creator Applications ({creators.length})
                </h2>
                {creators.length === 0 ? (
                  <p className="text-text-secondary">No applications yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-subtle text-left text-text-secondary">
                          <th className="pb-2 pr-4">Name</th>
                          <th className="pb-2 pr-4">Email</th>
                          <th className="pb-2 pr-4">Niches</th>
                          <th className="pb-2 pr-4">Portfolio</th>
                          <th className="pb-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {creators.map((c) => (
                          <tr key={c.id} className="border-b border-border-subtle">
                            <td className="py-3 pr-4 text-text-primary">{c.name}</td>
                            <td className="py-3 pr-4 text-text-secondary">{c.email}</td>
                            <td className="py-3 pr-4 text-text-secondary">{c.niches || "-"}</td>
                            <td className="py-3 pr-4">
                              {c.portfolio ? (
                                <a
                                  href={c.portfolio}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-brand-yellow hover:underline"
                                >
                                  View
                                </a>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="py-3 text-text-muted">{formatDate(c.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === "brands" && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-text-primary">
                  Brand Enquiries ({brands.length})
                </h2>
                {brands.length === 0 ? (
                  <p className="text-text-secondary">No enquiries yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-subtle text-left text-text-secondary">
                          <th className="pb-2 pr-4">Company</th>
                          <th className="pb-2 pr-4">Contact</th>
                          <th className="pb-2 pr-4">Email</th>
                          <th className="pb-2 pr-4">Industry</th>
                          <th className="pb-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {brands.map((b) => (
                          <tr key={b.id} className="border-b border-border-subtle">
                            <td className="py-3 pr-4 text-text-primary">{b.company}</td>
                            <td className="py-3 pr-4 text-text-secondary">{b.contact}</td>
                            <td className="py-3 pr-4 text-text-secondary">{b.email}</td>
                            <td className="py-3 pr-4 text-text-secondary">{b.industry || "-"}</td>
                            <td className="py-3 text-text-muted">{formatDate(b.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === "contacts" && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-text-primary">
                  Contact Messages ({contacts.length})
                </h2>
                {contacts.length === 0 ? (
                  <p className="text-text-secondary">No messages yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-subtle text-left text-text-secondary">
                          <th className="pb-2 pr-4">Name</th>
                          <th className="pb-2 pr-4">Email</th>
                          <th className="pb-2 pr-4">Type</th>
                          <th className="pb-2 pr-4">Message</th>
                          <th className="pb-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((c) => (
                          <tr key={c.id} className="border-b border-border-subtle">
                            <td className="py-3 pr-4 text-text-primary">{c.name || "-"}</td>
                            <td className="py-3 pr-4 text-text-secondary">{c.email}</td>
                            <td className="py-3 pr-4 text-text-secondary">{c.type}</td>
                            <td className="py-3 pr-4 text-text-secondary max-w-xs truncate">
                              {c.message || "-"}
                            </td>
                            <td className="py-3 text-text-muted">{formatDate(c.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === "waitlist" && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-text-primary">
                  Academy Waitlist ({waitlist.length})
                </h2>
                {waitlist.length === 0 ? (
                  <p className="text-text-secondary">No signups yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border-subtle text-left text-text-secondary">
                          <th className="pb-2 pr-4">Name</th>
                          <th className="pb-2 pr-4">Email</th>
                          <th className="pb-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {waitlist.map((w) => (
                          <tr key={w.id} className="border-b border-border-subtle">
                            <td className="py-3 pr-4 text-text-primary">{w.name || "-"}</td>
                            <td className="py-3 pr-4 text-text-secondary">{w.email}</td>
                            <td className="py-3 text-text-muted">{formatDate(w.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  onClick,
}: {
  label: string;
  value: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="card text-left hover:border-brand-yellow transition-colors"
    >
      <p className="text-text-secondary text-sm">{label}</p>
      <p className="text-3xl font-bold text-text-primary mt-1">{value}</p>
    </button>
  );
}
