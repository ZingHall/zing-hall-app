import { CreatorProfile } from "@/components/creator-profile";
import { useParams } from "react-router-dom";

export default function CreatorPage() {
  const { creatorId } = useParams();
  return <CreatorProfile creatorId={creatorId} />;
}
