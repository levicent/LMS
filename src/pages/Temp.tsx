import { useState } from 'react';
import { Download, Search } from 'lucide-react';
interface DonationTransaction {
  id: string;
  date: string;
  amount: number;
  cause: string;
  receiptUrl: string;
}

const DonorDashboard = () => {
  const [donations] = useState<DonationTransaction[]>([
    {
      id: "1",
      date: "2024-02-15",
      amount: 100.00,
      cause: "Education Fund",
      receiptUrl: "/receipts/1.pdf"
    },
    {
      id: "2",
      date: "2024-02-10",
      amount: 250.00,
      cause: "Healthcare Initiative",
      receiptUrl: "/receipts/2.pdf"
    },
    {
      id: "3",
      date: "2024-01-28",
      amount: 75.00,
      cause: "Environmental Protection",
      receiptUrl: "/receipts/3.pdf"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDonations = donations.filter(donation => 
    donation.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.date.includes(searchTerm) ||
    donation.amount.toString().includes(searchTerm)
  );

  const handleDownload = (receiptUrl: string) => {
    console.log(`Downloading receipt from: ${receiptUrl}`);
  };

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Donor Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and track your donations</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-600">Total Donations</span>
              <p className="text-xl font-bold text-blue-600">${totalDonations.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Search Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Donation History</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search donations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cause
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonations.map((donation) => (
                  <tr 
                    key={donation.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(donation.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donation.cause}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${donation.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleDownload(donation.receiptUrl)}
                        className="inline-flex items-center justify-center w-8 h-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Download Receipt"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredDonations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No donations found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;