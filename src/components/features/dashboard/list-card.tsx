import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Calendar,
  MoreVertical,
  Archive,
  Trash2,
  Users,
  ArchiveRestore,
  ExternalLink,
  Crown,
  User,
} from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "../../ui/progress";
import { verifySession } from "@/lib/dal";

interface ListCardProps {
  list: any;
}

export async function ListCard({ list }: ListCardProps) {
  const session = await verifySession();
  const userId = session.userId;

  // Count members + owner
  // const membersCount = list.members.length + 1;

  // Items
  // const allItems = list.items?.length ?? 0;
  // const completedItems = list.items?.filter((i: Project) => i.is_completed).length ?? 0;
  // const pendingItems = allItems - completedItems;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{list.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
