import React, { useState } from 'react';
// FIX: Renamed the imported `DashboardView` enum to `DashboardViewEnum` to resolve the naming conflict with the `DashboardView` component.
import { Country, DashboardView as DashboardViewEnum } from './types';
import { 
    DashboardIcon, UsersIcon, BriefcaseIcon, FileTextIcon, 
    DollarSignIcon, ShoppingCartIcon, SettingsIcon, LogOutIcon,
    BellIcon, SearchIcon, PlusCircleIcon, ChevronDownIcon,
    CrmIcon, HrIcon, ReportsIcon, FinanceIcon,
    DownloadIcon, EyeIcon, QrCodeIcon
} from './components/icons';

const SidebarItem: React.FC<{
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    onClick: () => void;
}> = ({ icon, text, active, onClick }) => (
    <li className="px-3">
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                active ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-300 hover:bg-emerald-800 hover:text-white'
            }`}
        >
            {icon}
            <span className="font-semibold tracking-wide">{text}</span>
        </a>
    </li>
);

const Sidebar: React.FC<{
    activeView: DashboardViewEnum;
    setActiveView: (view: DashboardViewEnum) => void;
}> = ({ activeView, setActiveView }) => {
    const menuItems = [
        { view: DashboardViewEnum.DASHBOARD, icon: <DashboardIcon />, text: 'Dashboard' },
        { view: DashboardViewEnum.CRM, icon: <UsersIcon />, text: 'CRM' },
        { view: DashboardViewEnum.HR, icon: <BriefcaseIcon />, text: 'HR' },
        { view: DashboardViewEnum.REPORTS, icon: <FileTextIcon />, text: 'Reports' },
        { view: DashboardViewEnum.FINANCE, icon: <DollarSignIcon />, text: 'Finance' },
        { view: DashboardViewEnum.STORE, icon: <ShoppingCartIcon />, text: 'Store' },
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
            <div className="h-20 flex items-center justify-center px-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    <h1 className="text-xl font-bold tracking-wider">MedLab</h1>
                </div>
            </div>
            <nav className="flex-grow pt-6">
                <ul className="space-y-3">
                    {menuItems.map(item => (
                        <SidebarItem
                            key={item.view}
                            icon={item.icon}
                            text={item.text}
                            active={activeView === item.view}
                            onClick={() => setActiveView(item.view)}
                        />
                    ))}
                </ul>
            </nav>
            <div className="p-3 border-t border-gray-700">
                <ul className="space-y-3">
                     <SidebarItem icon={<SettingsIcon />} text="Settings" onClick={() => setActiveView(DashboardViewEnum.SETTINGS)} active={activeView === DashboardViewEnum.SETTINGS}/>
                     <SidebarItem icon={<LogOutIcon />} text="Logout" onClick={() => {}} />
                </ul>
            </div>
        </aside>
    );
};


const CountrySelector: React.FC<{ selectedCountry: Country; onSelectCountry: (country: Country) => void; }> = ({ selectedCountry, onSelectCountry }) => (
    <div className="flex items-center space-x-1 bg-gray-200 rounded-lg p-1">
        <button
            onClick={() => onSelectCountry(Country.KSA)}
            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-200 ${selectedCountry === Country.KSA ? 'bg-white text-gray-800 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'}`}
        >
            🇸🇦 KSA
        </button>
        <button
            onClick={() => onSelectCountry(Country.UAE)}
            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-200 ${selectedCountry === Country.UAE ? 'bg-white text-gray-800 shadow-sm' : 'bg-transparent text-gray-500 hover:text-gray-700'}`}
        >
            🇦🇪 UAE
        </button>
    </div>
);

const DashboardHeader: React.FC<{ 
    title: string;
    selectedCountry: Country;
    onSelectCountry: (country: Country) => void;
 }> = ({ title, selectedCountry, onSelectCountry }) => (
    <header className="h-20 flex items-center justify-between px-8 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-6">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-64 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <CountrySelector selectedCountry={selectedCountry} onSelectCountry={onSelectCountry} />
            <button className="text-gray-500 hover:text-gray-800 relative">
                <BellIcon />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3">
                <img src="https://i.pravatar.cc/40" alt="Admin" className="h-10 w-10 rounded-full" />
                <div>
                    <div className="font-semibold text-gray-800">Admin User</div>
                    <div className="text-sm text-gray-500">System Manager</div>
                </div>
                <button className="text-gray-500 hover:text-gray-800">
                   <ChevronDownIcon />
                </button>
            </div>
        </div>
    </header>
);

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; change: string; }> = ({ icon, title, value, change }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            <p className="text-sm text-green-500 mt-1">{change}</p>
        </div>
        <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
            {icon}
        </div>
    </div>
);

const DashboardView: React.FC<{ selectedCountry: Country }> = ({ selectedCountry }) => {
    const currency = selectedCountry === Country.KSA ? 'SAR' : 'AED';
    const stats = [
        { icon: <DollarSignIcon className="h-6 w-6"/>, title: "Total Revenue", value: `${currency} 1,250,400`, change: "+12.5% this month" },
        { icon: <UsersIcon className="h-6 w-6"/>, title: "New Patients", value: "3,210", change: "+8.2% this month" },
        { icon: <FileTextIcon className="h-6 w-6"/>, title: "Reports Pending", value: "89", change: "-2.1% this week" },
        { icon: <CrmIcon className="h-6 w-6" />, title: "Appointments Today", value: "124", change: "+5 vs yesterday" }
    ];

    return (
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Revenue Overview ({currency})</h3>
                    {/* Chart Placeholder */}
                    <div className="h-72 flex items-end space-x-4">
                        {[50,70,80,60,90,75,85].map((h, i) => (
                             <div key={i} className="flex-1 flex flex-col items-center">
                                <div className="w-full bg-emerald-400 rounded-t-md" style={{height: `${h}%`}}></div>
                                <div className="text-xs mt-1 text-gray-500">Day {i+1}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Recent Activity</h3>
                    <ul className="space-y-4">
                        {[
                            {text: "Invoice #INV-0123 paid", time: "15m ago"},
                            {text: "New patient Abdullah added", time: "1h ago"},
                            {text: "Report for Fatima Ali generated", time: "3h ago"},
                            {text: "New appointment scheduled", time: "5h ago"},
                        ].map(item => (
                            <li key={item.text} className="flex items-start space-x-3">
                                <div className="mt-1 h-2 w-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-gray-700">{item.text}</p>
                                    <p className="text-xs text-gray-400">{item.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Table: React.FC<{headers: string[], data: React.ReactNode[][]}> = ({headers, data}) => (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left">
            <thead className="bg-gray-50">
                <tr>
                    {headers.map(h => <th key={h} className="p-4 text-sm font-semibold text-gray-600 tracking-wider whitespace-nowrap">{h}</th>)}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                        {row.map((cell, j) => <td key={j} className="p-4 text-gray-700 whitespace-nowrap">{cell}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const StatusBadge: React.FC<{status: string}> = ({ status }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full inline-block";
    let statusClasses = "";
    switch (status.toLowerCase()) {
        case 'completed':
        case 'paid':
        case 'active':
            statusClasses = 'bg-green-100 text-green-800';
            break;
        case 'pending':
        case 'unpaid':
            statusClasses = 'bg-yellow-100 text-yellow-800';
            break;
        case 'in progress':
            statusClasses = 'bg-blue-100 text-blue-800';
            break;
        case 'overdue':
        case 'inactive':
            statusClasses = 'bg-red-100 text-red-800';
            break;
        default:
            statusClasses = 'bg-gray-100 text-gray-800';
    }
    return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
}

const ActionButton: React.FC<{icon: React.ReactNode, tooltip: string}> = ({ icon, tooltip }) => (
    <button className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-full transition-colors relative group">
        {icon}
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {tooltip}
        </span>
    </button>
)

const ReportsView: React.FC = () => {
    const headers = ["Report ID", "Patient Name", "Test Type", "Date", "Status", "Actions"];
    const reportsData = [
        ["REP-07-201", "Khalid Al-Fahd", "Complete Blood Count", "2024-07-21", "Completed"],
        ["REP-07-200", "Noura Al-Saleh", "Lipid Panel", "2024-07-21", "Pending"],
        ["REP-07-199", "Omar bin Laden", "Thyroid Function Test", "2024-07-20", "In Progress"],
        ["REP-07-198", "Aisha Al-Ghamdi", "Urinalysis", "2024-07-20", "Completed"],
    ];

    const data: React.ReactNode[][] = reportsData.map(row => [
        <span className="font-medium text-gray-800">{row[0]}</span>,
        row[1],
        row[2],
        row[3],
        <StatusBadge status={row[4] as string} />,
        <div className="flex items-center space-x-1">
            <ActionButton icon={<EyeIcon />} tooltip="View" />
            <ActionButton icon={<DownloadIcon />} tooltip="Download" />
        </div>
    ]);

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Medical Reports</h3>
                <button className="flex items-center space-x-2 bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                    <PlusCircleIcon />
                    <span>New Report</span>
                </button>
            </div>
            <Table headers={headers} data={data} />
        </div>
    );
};

const FinanceView: React.FC<{ selectedCountry: Country }> = ({ selectedCountry }) => {
    const currency = selectedCountry === Country.KSA ? 'SAR' : 'AED';
    const stats = [
        { icon: <DollarSignIcon className="h-6 w-6"/>, title: "Total Invoices", value: `1,480`, change: "+50 this month" },
        { icon: <FileTextIcon className="h-6 w-6"/>, title: "Pending Payments", value: `${currency} 85,200`, change: "120 invoices" },
        { icon: <CrmIcon className="h-6 w-6"/>, title: `Taxes Paid (${selectedCountry})`, value: `${currency} 187,560`, change: "YTD" },
        { icon: <ShoppingCartIcon className="h-6 w-6"/>, title: "Operational Costs", value: `${currency} 450,100`, change: "-1.5% vs last month" }
    ];
    
    const headers = ["Invoice ID", "Patient", "Amount", "Date", "Status", "Actions"];
    const transactionsData = [
        ["INV-07-305", "Khalid Al-Fahd", 250, "2024-07-21", "Paid"],
        ["INV-07-304", "Noura Al-Saleh", 180, "2024-07-21", "Unpaid"],
        ["INV-07-303", "Ahmed Al-Mansoori", 550, "2024-07-19", "Overdue"],
        ["INV-07-302", "Fatima Al-Jabri", 320, "2024-07-18", "Paid"],
    ];

    const data: React.ReactNode[][] = transactionsData.map(row => [
        <span className="font-medium text-emerald-600 hover:underline cursor-pointer">{row[0]}</span>,
        row[1],
        `${currency} ${row[2]}`,
        row[3],
        <StatusBadge status={row[4] as string} />,
        <div className="flex items-center space-x-1">
            <ActionButton icon={<EyeIcon />} tooltip="View Invoice" />
        </div>
    ]);

    return (
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
                <button className="flex items-center space-x-2 bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                    <PlusCircleIcon />
                    <span>New Invoice</span>
                </button>
            </div>
            <Table headers={headers} data={data} />
        </div>
    );
};

const StoreView: React.FC<{ selectedCountry: Country }> = ({ selectedCountry }) => {
    const storeUrl = `https://medlab.store/${selectedCountry.toLowerCase()}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(storeUrl)}`;
    const currency = selectedCountry === Country.KSA ? 'SAR' : 'AED';
    const products = [
        { name: "Digital Thermometer", price: 75, image: "https://via.placeholder.com/150/84cc16/ffffff?text=Product" },
        { name: "N95 Face Masks (50 pack)", price: 120, image: "https://via.placeholder.com/150/84cc16/ffffff?text=Product" },
        { name: "Blood Glucose Monitor", price: 250, image: "https://via.placeholder.com/150/84cc16/ffffff?text=Product" },
        { name: "Hand Sanitizer (500ml)", price: 45, image: "https://via.placeholder.com/150/84cc16/ffffff?text=Product" },
    ];

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Store Products</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {products.map(product => (
                            <div key={product.name} className="bg-white rounded-xl shadow-md overflow-hidden flex">
                                <img src={product.image} alt={product.name} className="w-1/3 object-cover"/>
                                <div className="p-4 flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{product.name}</h4>
                                        <p className="text-lg font-bold text-emerald-600 mt-1">{currency} {product.price}</p>
                                    </div>
                                    <button className="mt-3 w-full flex items-center justify-center space-x-2 bg-emerald-50 text-emerald-700 font-semibold px-3 py-2 rounded-lg hover:bg-emerald-100 transition-colors text-sm">
                                        <ShoppingCartIcon className="h-4 w-4" />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center sticky top-8">
                        <QrCodeIcon className="mx-auto h-12 w-12 text-emerald-500 mb-3" />
                        <h4 className="font-bold text-lg text-gray-800">Access Store on Mobile</h4>
                        <p className="text-sm text-gray-500 mt-2 mb-4">Scan the QR code with your phone to visit our online store for {selectedCountry}.</p>
                        <img src={qrCodeUrl} alt="Store QR Code" className="mx-auto rounded-lg shadow-sm border-4 border-white" />
                        <a href={storeUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline mt-4 block break-all">{storeUrl}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PlaceholderView: React.FC<{title: string}> = ({title}) => {
    let headers: string[] = [];
    let data: (string|number)[][] = [];

    if (title === "CRM") {
        headers = ["Patient ID", "Name", "Last Visit", "Status", "Next Appointment"];
        data = [
            ["P001", "Abdullah Al-Qahtani", "2024-07-15", "Active", "2024-08-10"],
            ["P002", "Fatima Al-Mansoori", "2024-07-12", "Active", "N/A"],
            ["P003", "Mohammed Khan", "2024-06-28", "Inactive", "N/A"],
        ];
    } else if (title === "HR") {
         headers = ["Employee ID", "Name", "Role", "Branch", "Status"];
        data = [
            ["E101", "Dr. Aisha Ahmed", "Chief Pathologist", "Riyadh", "Active"],
            ["E102", "Yusuf Ibrahim", "Lab Technician", "Dubai", "Active"],
            ["E103", "Layla Al-Jaber", "Receptionist", "Riyadh", "On Leave"],
        ];
    } else {
        return <div className="p-8"><h2 className="text-xl">Content for {title} coming soon.</h2></div>;
    }
    
    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Manage {title}</h3>
                <button className="flex items-center space-x-2 bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                    <PlusCircleIcon />
                    <span>Add New</span>
                </button>
            </div>
            <Table headers={headers} data={data} />
        </div>
    )
};


export default function App() {
    const [selectedCountry, setSelectedCountry] = useState<Country>(Country.KSA);
    const [activeView, setActiveView] = useState<DashboardViewEnum>(DashboardViewEnum.DASHBOARD);

    const renderContent = () => {
        switch(activeView) {
            case DashboardViewEnum.DASHBOARD:
                return <DashboardView selectedCountry={selectedCountry} />;
            case DashboardViewEnum.CRM:
                return <PlaceholderView title="CRM" />;
            case DashboardViewEnum.HR:
                return <PlaceholderView title="HR" />;
            case DashboardViewEnum.REPORTS:
                return <ReportsView />;
            case DashboardViewEnum.FINANCE:
                return <FinanceView selectedCountry={selectedCountry} />;
            case DashboardViewEnum.STORE:
                return <StoreView selectedCountry={selectedCountry} />;
            default:
                return <PlaceholderView title={activeView} />;
        }
    };

    return (
        <div className="h-screen w-screen flex bg-gray-100 overflow-hidden">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            <div className="flex-1 flex flex-col">
                <DashboardHeader title={activeView} selectedCountry={selectedCountry} onSelectCountry={setSelectedCountry} />
                <main className="flex-1 overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}