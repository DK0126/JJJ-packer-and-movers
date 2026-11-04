import React, { useState, useEffect } from 'react';
import { 
  X, Lock, ShieldCheck, Search, Filter, Download, Check, Edit2, 
  Trash2, Phone, Mail, MessageSquare, AlertCircle, RefreshCw, Sliders 
} from 'lucide-react';
import { MovingEnquiry, EnquiryStatus, BusinessConfig } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: (config: BusinessConfig) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  isOpen, 
  onClose,
  onConfigUpdated 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'enquiries' | 'config'>('enquiries');
  const [enquiries, setEnquiries] = useState<MovingEnquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Selected enquiry for details & updating notes
  const [selectedEnquiry, setSelectedEnquiry] = useState<MovingEnquiry | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [savingNote, setSavingNote] = useState<boolean>(false);

  // Business Config editor
  const [configForm, setConfigForm] = useState({
    movesCompleted: '[XX+]',
    citiesCovered: '[XX+]',
    happyCustomers: '[XX+]',
    customerRating: '[XX/5]',
    announcement: 'Serving Chennai & all major destinations across India with 24/7 booking support.',
  });
  const [savingConfig, setSavingConfig] = useState<boolean>(false);
  const [configSavedSuccess, setConfigSavedSuccess] = useState<boolean>(false);

  // Restore existing session if stored in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('jjj_admin_token');
    if (savedToken) {
      setAuthToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch enquiries when authenticated
  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchEnquiries();
      fetchConfig();
    }
  }, [isAuthenticated, authToken]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Incorrect PIN / Master Key');
      }

      setAuthToken(data.token);
      localStorage.setItem('jjj_admin_token', data.token);
      setIsAuthenticated(true);
      setPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed. Please verify password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jjj_admin_token');
    setAuthToken('');
    setIsAuthenticated(false);
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/admin/config');
      if (res.ok) {
        const data = await res.json();
        if (data.config && data.config.stats) {
          setConfigForm({
            movesCompleted: data.config.stats.movesCompleted || '[XX+]',
            citiesCovered: data.config.stats.citiesCovered || '[XX+]',
            happyCustomers: data.config.stats.happyCustomers || '[XX+]',
            customerRating: data.config.stats.customerRating || '[XX/5]',
            announcement: data.config.announcement || '',
          });
        }
      }
    } catch (err) {
      console.error('Failed to fetch config', err);
    }
  };

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status: newStatus } : e));
        if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
          setSelectedEnquiry(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNote(true);

    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ adminNotes: editingNotes }),
      });

      if (res.ok) {
        setEnquiries(prev => prev.map(e => e.id === selectedEnquiry.id ? { ...e, adminNotes: editingNotes } : e));
        setSelectedEnquiry(prev => prev ? { ...prev, adminNotes: editingNotes } : null);
      }
    } catch (err) {
      console.error('Failed to save notes', err);
    } finally {
      setSavingNote(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingConfig(true);
    setConfigSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          stats: {
            movesCompleted: configForm.movesCompleted,
            citiesCovered: configForm.citiesCovered,
            happyCustomers: configForm.happyCustomers,
            customerRating: configForm.customerRating,
          },
          announcement: configForm.announcement,
        }),
      });

      const data = await res.json();
      if (res.ok && data.config) {
        setConfigSavedSuccess(true);
        onConfigUpdated(data.config);
        setTimeout(() => setConfigSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save config', err);
    } finally {
      setSavingConfig(false);
    }
  };

  const exportCSV = () => {
    if (enquiries.length === 0) return;

    const headers = ['Enquiry ID', 'Name', 'Phone', 'Email', 'Moving Type', 'Pickup', 'Destination', 'Date', 'Property', 'Status', 'Submitted At', 'Notes'];
    const rows = enquiries.map(e => [
      e.id,
      `"${e.name}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${e.movingType}"`,
      `"${e.pickupLocation}"`,
      `"${e.deliveryLocation}"`,
      `"${e.movingDate}"`,
      `"${e.propertyType}"`,
      `"${e.status}"`,
      `"${e.createdAt}"`,
      `"${(e.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jjj_moving_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // Filtered list
  const filteredEnquiries = enquiries.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Aggregation counts
  const counts = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'New').length,
    contacted: enquiries.filter(e => e.status === 'Contacted').length,
    quoted: enquiries.filter(e => e.status === 'Quoted').length,
    confirmed: enquiries.filter(e => e.status === 'Confirmed').length,
    completed: enquiries.filter(e => e.status === 'Completed').length,
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Contacted': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Quoted': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Confirmed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Completed': return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#070D1F] border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-none">
                JJJ Management Console
              </h3>
              <span className="text-xs text-slate-400">Lead Database & Company Configuration</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded bg-slate-800 transition-colors"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-center shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 text-amber-400">
                <Lock className="w-7 h-7" />
              </div>

              <h4 className="text-xl font-bold text-white mb-1">Admin Access Required</h4>
              <p className="text-xs text-slate-400 mb-6">
                Enter your administrative PIN / Master Key to inspect incoming customer quotation requests.
              </p>

              {loginError && (
                <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  required
                  placeholder="Enter Admin PIN (Default: jjj2026)"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 text-center font-mono tracking-widest"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
                >
                  Authenticate Console
                </button>
              </form>

              <div className="mt-6 text-[11px] text-slate-400">
                Default Master Key: <code className="text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded">jjj2026</code>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs & Metrics Strip */}
            <div className="p-4 bg-slate-900/40 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              {/* Tab Selector */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    activeTab === 'enquiries'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Enquiries ({enquiries.length})
                </button>
                <button
                  onClick={() => setActiveTab('config')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    activeTab === 'config'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Edit Statistics & Info
                </button>
              </div>

              {/* Status metrics pill counters */}
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                  New: {counts.new}
                </span>
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                  Quoted: {counts.quoted}
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Confirmed: {counts.confirmed}
                </span>
              </div>
            </div>

            {/* TAB 1: Enquiries Manager */}
            {activeTab === 'enquiries' && (
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left: Enquiries List */}
                <div className="flex-1 flex flex-col overflow-hidden border-r border-slate-800">
                  {/* Search & Filter Toolbar */}
                  <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center gap-2">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search name, phone, city, ID..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={e => setStatusFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={fetchEnquiries}
                      title="Refresh Leads"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    </button>

                    <button
                      onClick={exportCSV}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  {/* Enquiries Table / List */}
                  <div className="flex-1 overflow-y-auto">
                    {loading ? (
                      <div className="p-10 text-center text-xs text-slate-400">Loading enquiries...</div>
                    ) : filteredEnquiries.length === 0 ? (
                      <div className="p-12 text-center text-slate-400">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                        <div className="text-sm font-semibold text-slate-300">No enquiries found</div>
                        <div className="text-xs text-slate-500 mt-1">Submitted quotation forms appear here in real time.</div>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-800/80">
                        {filteredEnquiries.map(enquiry => (
                          <div
                            key={enquiry.id}
                            onClick={() => {
                              setSelectedEnquiry(enquiry);
                              setEditingNotes(enquiry.adminNotes || '');
                            }}
                            className={`p-4 cursor-pointer transition-colors ${
                              selectedEnquiry?.id === enquiry.id
                                ? 'bg-amber-500/10 border-l-4 border-amber-500'
                                : 'hover:bg-slate-900/60'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-mono text-xs font-bold text-amber-400">
                                {enquiry.id}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-medium border ${getStatusBadge(enquiry.status)}`}>
                                {enquiry.status}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-sm font-bold text-white mb-1">
                              <span>{enquiry.name}</span>
                              <span className="text-xs font-mono font-normal text-slate-400">{enquiry.phone}</span>
                            </div>

                            <div className="text-xs text-slate-300 flex items-center gap-1.5 mb-1">
                              <span className="text-amber-400 font-medium">{enquiry.movingType}</span>
                              <span>·</span>
                              <span>{enquiry.pickupLocation} ➔ {enquiry.deliveryLocation}</span>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                              <span>Date: {enquiry.movingDate}</span>
                              <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Selected Enquiry Detail View (Desktop 420px width) */}
                {selectedEnquiry ? (
                  <div className="w-full lg:w-[420px] bg-slate-950/60 p-5 overflow-y-auto flex flex-col justify-between border-t lg:border-t-0 border-slate-800">
                    <div className="space-y-4">
                      {/* Top detail header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div>
                          <span className="text-xs text-amber-400 font-mono font-bold">{selectedEnquiry.id}</span>
                          <h4 className="text-base font-bold text-white mt-0.5">{selectedEnquiry.name}</h4>
                        </div>
                        <select
                          value={selectedEnquiry.status}
                          onChange={e => handleStatusChange(selectedEnquiry.id, e.target.value as EnquiryStatus)}
                          className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-amber-400 font-bold focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Direct Communications Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`tel:${selectedEnquiry.phone}`}
                          className="py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span>Call Client</span>
                        </a>

                        <a
                          href={`https://wa.me/91${selectedEnquiry.whatsapp || selectedEnquiry.phone}?text=${encodeURIComponent(
                            `Hi ${selectedEnquiry.name}, this is JJJ Packers & Movers regarding your quotation enquiry ${selectedEnquiry.id} for ${selectedEnquiry.movingType}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-xs font-bold text-white flex items-center justify-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      {/* Info grid */}
                      <div className="space-y-2.5 text-xs text-slate-300">
                        <div>
                          <span className="text-slate-500 block">Contact</span>
                          <span className="font-semibold text-white">{selectedEnquiry.phone}</span>
                          {selectedEnquiry.email && <span className="block text-slate-400">{selectedEnquiry.email}</span>}
                        </div>

                        <div>
                          <span className="text-slate-500 block">Moving Route</span>
                          <span className="font-semibold text-white">{selectedEnquiry.pickupLocation}</span>
                          <span className="text-amber-400 mx-1">➔</span>
                          <span className="font-semibold text-white">{selectedEnquiry.deliveryLocation}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-slate-500 block">Property Type</span>
                            <span className="font-semibold text-white">{selectedEnquiry.propertyType}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Moving Date</span>
                            <span className="font-semibold text-white">{selectedEnquiry.movingDate}</span>
                          </div>
                        </div>

                        {selectedEnquiry.description && (
                          <div>
                            <span className="text-slate-500 block">Inventory Notes</span>
                            <p className="p-2 rounded bg-slate-900 text-slate-300 mt-1 whitespace-pre-wrap">
                              {selectedEnquiry.description}
                            </p>
                          </div>
                        )}

                        {selectedEnquiry.additionalRequirements && (
                          <div>
                            <span className="text-slate-500 block">Special Requirements</span>
                            <p className="p-2 rounded bg-slate-900 text-slate-300 mt-1 whitespace-pre-wrap">
                              {selectedEnquiry.additionalRequirements}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Admin Internal Notes Box */}
                      <div className="pt-3 border-t border-slate-800">
                        <label className="block text-xs font-bold text-slate-400 mb-1">
                          Internal Follow-up Notes
                        </label>
                        <textarea
                          rows={3}
                          value={editingNotes}
                          onChange={e => setEditingNotes(e.target.value)}
                          placeholder="e.g. Quoted ₹18,500 on phone; awaiting customer confirmation..."
                          className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                        <button
                          onClick={handleSaveNotes}
                          disabled={savingNote}
                          className="mt-2 w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-colors"
                        >
                          {savingNote ? 'Saving...' : 'Update Internal Notes'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hidden lg:flex w-[420px] items-center justify-center p-6 text-xs text-slate-500 text-center">
                    Select any enquiry from the list to view complete details, dispatch direct calls, and log notes.
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Config & Statistics Editor */}
            {activeTab === 'config' && (
              <div className="flex-1 p-6 overflow-y-auto max-w-2xl mx-auto w-full">
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-white mb-1">Editable Trust Statistics</h4>
                  <p className="text-xs text-slate-400">
                    Replace the placeholder figures with verified milestones whenever you are ready.
                  </p>
                </div>

                {configSavedSuccess && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Configuration successfully updated on website!</span>
                  </div>
                )}

                <form onSubmit={handleSaveConfig} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Moves Completed
                      </label>
                      <input
                        type="text"
                        value={configForm.movesCompleted}
                        onChange={e => setConfigForm({ ...configForm, movesCompleted: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Cities Covered
                      </label>
                      <input
                        type="text"
                        value={configForm.citiesCovered}
                        onChange={e => setConfigForm({ ...configForm, citiesCovered: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Happy Customers
                      </label>
                      <input
                        type="text"
                        value={configForm.happyCustomers}
                        onChange={e => setConfigForm({ ...configForm, happyCustomers: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Customer Rating
                      </label>
                      <input
                        type="text"
                        value={configForm.customerRating}
                        onChange={e => setConfigForm({ ...configForm, customerRating: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Announcement Banner Notice
                    </label>
                    <input
                      type="text"
                      value={configForm.announcement}
                      onChange={e => setConfigForm({ ...configForm, announcement: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={savingConfig}
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                    >
                      {savingConfig ? 'Saving...' : 'Save Configuration Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
