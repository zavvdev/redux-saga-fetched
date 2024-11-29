import { useState } from "react";
import { Button } from "../../atoms/button";
import { Query } from "./molecules/query";
import { QueryError } from "./molecules/query-error";
import { Mutation } from "./molecules/mutation";

var Tab = {
  Query: "query",
  QueryError: "query-error",
  Mutation: "mutation",
  MutationError: "mutation-error",
  MutationErrorRetry: "mutation-error-retry",
};

export function Books() {
  var [tab, setTab] = useState(Tab.Query);

  return (
    <div className="px-10 pb-10">
      <div className="flex gap-4 my-10">
        <Button
          active={tab === Tab.Query}
          onClick={() => setTab(Tab.Query)}
        >
          Query
        </Button>
        <Button
          active={tab === Tab.QueryError}
          onClick={() => setTab(Tab.QueryError)}
        >
          Query Error
        </Button>
        <Button
          active={tab === Tab.Mutation}
          onClick={() => setTab(Tab.Mutation)}
        >
          Mutation
        </Button>
        <Button
          active={tab === Tab.MutationError}
          onClick={() => setTab(Tab.MutationError)}
        >
          Mutation Error
        </Button>
        <Button
          active={tab === Tab.MutationErrorRetry}
          onClick={() => setTab(Tab.MutationErrorRetry)}
        >
          Mutation Error Retry
        </Button>
      </div>
      {tab === Tab.Query && <Query />}
      {tab === Tab.QueryError && <QueryError />}
      {tab === Tab.Mutation && <Mutation />}
    </div>
  );
}
