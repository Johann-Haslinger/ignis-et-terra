import { useEntities } from "@leanscope/ecs-engine";
import { AdditionalTags } from "../../../base/enums";
import { useContext, useEffect } from "react";
import { LeanScopeClientContext } from "@leanscope/api-client/node";

const DeleteNotificationsSystem = () => {
  const lsc = useContext(LeanScopeClientContext);
  const [notificationEntities] = useEntities((e) => e.has(AdditionalTags.NOTIFICATION));

  useEffect(() => {
    notificationEntities.forEach((e) => {
      setTimeout(() => lsc.engine.removeEntity(e), 1400);
    });
  }, [notificationEntities.length, lsc]);

  return null;
};

export default DeleteNotificationsSystem;
