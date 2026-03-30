import Header from "@/components/layout/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import DeviceStatusChart from "@/components/dashboard/DeviceStatusChart";
import RecentDevices from "@/components/dashboard/RecentDevices";
import PendingExchanges from "@/components/dashboard/PendingExchanges";
import { Smartphone, Users, ShieldCheck, ArrowLeftRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <Header
        title="Dashboard"
        subtitle="Översikt över alla mobila enheter"
      />
      <div className="flex-1 p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Totalt enheter"
            value="248"
            change="+12 denna månad"
            changeType="positive"
            icon={<Smartphone className="h-5 w-5 text-brand-600" />}
            iconBg="bg-brand-50"
          />
          <StatsCard
            title="Aktiva enheter"
            value="231"
            change="93% av totalt"
            changeType="positive"
            icon={<Smartphone className="h-5 w-5 text-green-600" />}
            iconBg="bg-green-50"
          />
          <StatsCard
            title="Användare"
            value="184"
            change="+3 denna vecka"
            changeType="positive"
            icon={<Users className="h-5 w-5 text-purple-600" />}
            iconBg="bg-purple-50"
          />
          <StatsCard
            title="Utbytesanmälningar"
            value="7"
            change="Väntar på granskning"
            changeType="neutral"
            icon={<ArrowLeftRight className="h-5 w-5 text-orange-600" />}
            iconBg="bg-orange-50"
          />
        </div>

        {/* Charts + Tables */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <DeviceStatusChart />
          </div>
          <div className="lg:col-span-2">
            <RecentDevices />
          </div>
        </div>

        <PendingExchanges />
      </div>
    </div>
  );
}
