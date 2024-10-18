import React, { useMemo } from "react";

export const monthOptions = useMemo(() => {
  return [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
}, []);

export const priceOptions = useMemo(() => {
  return [
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "300", label: "300" },
  ];
}, []);
