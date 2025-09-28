"use client";

import { useMemo } from "react";
import { generateRandomName } from "@/lib/utils";
import { useOthers, useSelf } from "@/liveblocks.config";
import { Avatar } from "./Avatar";

const ActiveUsers = () => {
  const others = useOthers();
  const currentUser = useSelf();

  const hasMoreUsers = others.length > 3;
  const memoizedUsers = useMemo(() => {

    return (
      <div className="flex items-center justify-center gap-1 py-2">
        <div className="flex pl-3">
          {currentUser && (
            <Avatar
              name="You"
              otherStyles=" border-[2px] border-primary-green"
            />
          )}

          {others.slice(0, 2).map(({ connectionId }) => (
            <Avatar
              key={connectionId}
              name={generateRandomName()}
              otherStyles=" -ml-2"
            />
          ))}

          {hasMoreUsers && (
            <div className="z-10 -ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-black text-[10px] text-white">
              +{others.length - 3}
            </div>
          )}
        </div>
      </div>
    );
  }, [others.length, currentUser]);

  return memoizedUsers;
};

export default ActiveUsers;
