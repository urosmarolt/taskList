import { Status } from "@prisma/client";
import React from "react";

const statusMap: Record<Status, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "badge-accent" },
  CLOSED: { label: "Closed", color: "badge-primary" },
};

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div className={`badge badge-outline badge-sm ${statusMap[status].color}`}>
      {statusMap[status].label}
    </div>
  );
};

export default StatusBadge;
