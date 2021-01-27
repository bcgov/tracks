import React from "react";

import Disclaimer from "../pages/shared/Privacy";
import Privacy from "../pages/shared/Privacy";
import Accessibility from "../pages/shared/Accessibility";
import Copyright from "../pages/shared/Copyright";

const SharedRoutes =
  [
    {path: "/disclaimer", component: Disclaimer},
    {path: "/accessibility", component: Accessibility},
    {path: "/copyright", component: Copyright},
    {path: "/privacy", component: Privacy},
  ]

export default SharedRoutes;
