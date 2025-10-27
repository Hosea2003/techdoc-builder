"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, Equipment, equipmentTypes } from "@/types/project";

type ProjectDashboardProps = {
  projects: Project[];
};

export default function ProjectDashboard({ projects }: ProjectDashboardProps) {
  const searchParams = useSearchParams();
  const selectedTypeFromParams = searchParams.get("type") || undefined;

  const [typeFilter, setTypeFilter] = useState<string | undefined>(
    selectedTypeFromParams
  );
  const [roomFilter, setRoomFilter] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState("");

  // Combine all equipments from all projects
  const allEquipments = useMemo(
    () => projects.flatMap((p) => p.equipments ?? []),
    [projects]
  );

  // Compute filtered equipments
  const filteredEquipments = useMemo(() => {
    return allEquipments.filter((e: Equipment) => {
      const matchesType = typeFilter ? e.type === typeFilter : true;
      const matchesRoom = roomFilter ? e.room === roomFilter : true;
      const matchesText =
        searchText === "" ||
        e.type.toLowerCase().includes(searchText.toLowerCase());
      return matchesType && matchesRoom && matchesText;
    });
  }, [allEquipments, typeFilter, roomFilter, searchText]);

  // Compute stats
  const totalEquipments = filteredEquipments.length;
  const totalPoints = filteredEquipments.reduce(
    (sum, e) => sum + (e.equipment_points?.length || 0),
    0
  );
  const typeDistribution = filteredEquipments.reduce<Record<string, number>>(
    (acc, e) => {
      acc[e.type] = (acc[e.type] || 0) + 1;
      return acc;
    },
    {}
  );

  const availableRooms = Array.from(
    new Set(allEquipments.map((e) => e.room))
  );

  return (
    <div className="p-4 flex flex-col gap-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 items-end">
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value || undefined)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {equipmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={roomFilter}
            onValueChange={(value) => setRoomFilter(value || undefined)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select room" />
            </SelectTrigger>
            <SelectContent>
              {availableRooms.map((room) => (
                <SelectItem key={room} value={room}>
                  {room}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64"
          />

          <Button
            onClick={() => {
              setTypeFilter(undefined);
              setRoomFilter(undefined);
              setSearchText("");
            }}
          >
            Reset
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-6">
          <div>Total Equipments: {totalEquipments}</div>
          <div>Total Points: {totalPoints}</div>
          <div>
            Distribution par Type:
            {Object.entries(typeDistribution).map(([type, count]) => (
              <div key={type}>
                {type}: {count}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Equipment List */}
      <Card>
        <CardHeader>
          <CardTitle>Equipments</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {filteredEquipments.length === 0 && <div>No equipments found.</div>}
          {filteredEquipments.map((e: Equipment) => (
            <Card key={e.id} className="p-2">
              <div className="flex justify-between">
                <div>
                  <strong>{e.type}</strong> ({e.type}) - Room: {e.room}
                </div>
                <div>Points: {e.equipment_points?.length||0}</div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
