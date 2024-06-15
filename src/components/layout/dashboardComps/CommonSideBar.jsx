import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import classNames from "./helper";
import { navigation, teams, settings } from "./menuItems";
import { NavLink } from "react-router-dom";

export default function CommonSideBar() {
  return (
    <>
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-50 text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )
                    }
                  >
                    <item.icon
                      className={classNames("h-6 w-6 shrink-0")}
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Your teams
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <a
                    href={team.href}
                    className={classNames(
                      team.current
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <span
                      className={classNames(
                        team.current
                          ? "text-indigo-600 border-indigo-600"
                          : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                      )}
                    >
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <NavLink
              to={settings.href}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "bg-gray-50 text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                )
              }
            >
              <settings.icon
                className={classNames("h-6 w-6 shrink-0")}
                aria-hidden="true"
              />
              {settings.name}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
