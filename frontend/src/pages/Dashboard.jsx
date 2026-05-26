import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import {
  ArrowUpRight,
  DollarSign,
  Landmark,
  Activity,
} from "lucide-react";

import {
  getAnalytics,
  getTransactionHistory,
} from "../services/transactionService";

export default function Dashboard() {

  const [analytics, setAnalytics] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {

      try {

        const analyticsRes = await getAnalytics();

        const historyRes =
          await getTransactionHistory();

        setAnalytics(analyticsRes.data);

        setTransactions(
          historyRes.data.slice(0, 5)
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    loadData();

  }, []);

  return (

    <DashboardLayout>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor forex analytics and transactions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">
                Transactions
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">

                {loading
                  ? "..."
                  : analytics?.totalTransactions || 0}

              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

              <Activity
                className="text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">
                Total Spent
              </p>

              <h2 className="text-4xl font-bold text-slate-800 mt-3">

                {loading
                  ? "..."
                  : `$${analytics?.totalSpent?.toFixed(2) || 0}`}

              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

              <DollarSign
                className="text-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">
                Best Bank
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-3">

                {loading
                  ? "..."
                  : analytics?.mostUsedBank || "N/A"}

              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

              <Landmark
                className="text-orange-600"
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500 text-sm">
                Avg Transaction
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-3">

                {loading
                  ? "..."
                  : `$${analytics?.averageTransaction?.toFixed(2) || 0}`}

              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

              <ArrowUpRight
                className="text-purple-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Recent Transactions
            </h2>

            <p className="text-slate-500 mt-1">
              Latest forex activities
            </p>
          </div>
        </div>

        <div className="space-y-4">

          {loading ? (

            <p>Loading...</p>

          ) : (

            transactions.map((txn) => (

              <div
                key={txn._id}
                className="flex items-center justify-between border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition-all"
              >

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {txn.currency}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {new Date(
                      txn.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">

                  <h3 className="text-xl font-bold text-slate-800">
                    ${txn.finalAmount.toFixed(2)}
                  </h3>

                  <p className="text-sm text-emerald-600 mt-1">
                    {txn.status}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </DashboardLayout>
  );
}