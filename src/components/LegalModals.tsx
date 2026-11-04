import React from 'react';
import { X, ShieldCheck, FileText, Cookie } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'cookies' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#091124] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close legal modal"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4 text-slate-300 text-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Privacy Policy</span>
            </div>
            <p className="text-xs text-slate-400">Effective Date: {new Date().getFullYear()}</p>
            <p>
              At <strong>{BUSINESS_INFO.businessName}</strong>, we respect your privacy and are committed to protecting the personal information you share with us.
            </p>
            <h4 className="font-bold text-white text-base mt-4">1. Information We Collect</h4>
            <p>
              When requesting a quotation or contacting our team, we collect your full name, phone number, email address, pickup and delivery locations, inventory descriptions, and target moving dates.
            </p>
            <h4 className="font-bold text-white text-base mt-4">2. How We Use Your Information</h4>
            <p>
              Your contact and moving details are used strictly to calculate customized quotations, coordinate pickup and transportation logistics, dispatch moving crews, and provide status updates. We do not sell or rent your personal information to third-party telemarketers.
            </p>
            <h4 className="font-bold text-white text-base mt-4">3. Data Security</h4>
            <p>
              We maintain appropriate administrative and technical safeguards to keep customer records secure from unauthorized access or disclosure.
            </p>
            <h4 className="font-bold text-white text-base mt-4">4. Contact Us</h4>
            <p>
              If you have any questions regarding your personal information, please contact our privacy coordinator at {BUSINESS_INFO.email} or call {BUSINESS_INFO.phone}.
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4 text-slate-300 text-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-2">
              <FileText className="w-5 h-5" />
              <span>Terms & Conditions</span>
            </div>
            <p className="text-xs text-slate-400">Effective Date: {new Date().getFullYear()}</p>
            <p>
              Welcome to <strong>{BUSINESS_INFO.businessName}</strong>. By accessing our website, requesting a quotation, or booking our relocation services, you agree to the following terms:
            </p>
            <h4 className="font-bold text-white text-base mt-4">1. Quotations & Booking</h4>
            <p>
              All online or telephone estimates are based on the initial information and inventory list supplied by the customer. Any substantial addition to the inventory or unexpected access constraints (e.g. absent elevators, long walking distances exceeding standard thresholds) may affect the final billing.
            </p>
            <h4 className="font-bold text-white text-base mt-4">2. Prohibited & Hazardous Goods</h4>
            <p>
              Customers must not pack or hand over hazardous materials, inflammable liquids, fireworks, contraband, cash, jewelry, or critical official identity deeds. These items must remain in personal custody.
            </p>
            <h4 className="font-bold text-white text-base mt-4">3. Transit Timelines</h4>
            <p>
              While we make every operational effort to deliver on schedule, long-distance highway transit times may occasionally vary due to inclement weather, interstate vehicle checkpoints, or highway traffic restrictions.
            </p>
            <h4 className="font-bold text-white text-base mt-4">4. Jurisdiction</h4>
            <p>
              Any disputes arising from relocation contracts are subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu, India.
            </p>
          </div>
        )}

        {type === 'cookies' && (
          <div className="space-y-4 text-slate-300 text-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-2">
              <Cookie className="w-5 h-5" />
              <span>Cookie Policy</span>
            </div>
            <p>
              This website uses essential session cookies and local storage tokens to remember your form draft preferences and maintain secure administrative login sessions.
            </p>
            <h4 className="font-bold text-white text-base mt-4">Essential Usage</h4>
            <p>
              We do not use intrusive cross-site tracking cookies. You may disable cookies in your browser settings, though certain interactive capabilities may be limited.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
