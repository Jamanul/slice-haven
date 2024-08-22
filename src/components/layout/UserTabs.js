import Link from "next/link";

export default function UserTabs({isAdmin,pathname}) {

    return (
        <div className="flex gap-2">
            <Link className={`px-4 py-2 ${pathname ==='/profile' ? "bg-primary text-white":"bg-gray-300"}  rounded-2xl`} href={'/profile'}>Profile</Link>
            {
                isAdmin ? <> <Link className={`px-4 py-2 ${pathname === "/categories"?"bg-primary text-white":"bg-gray-300" }  rounded-2xl`} href={'/categories'}>Categories</Link>
            <Link className={`px-4 py-2 ${pathname === "/menu-items"?"bg-primary text-white":"bg-gray-300" } rounded-2xl`} href={'/menu-items'}>Menu Items</Link>
            <Link className={`px-4 py-2 ${pathname === "/users"?"bg-primary text-white":"bg-gray-300" } rounded-2xl`} href={'/users'}>Users</Link></> : ''
            }
           
        </div>
    )
}