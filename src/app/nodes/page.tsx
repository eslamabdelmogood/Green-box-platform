import MainLayout from '@/components/layout/main-layout';
import Header from '@/components/layout/header';
import NodeList from '@/components/nodes/node-list';
import { nodes } from '@/lib/data';

export default function NodesPage() {
  return (
    <MainLayout>
      <Header title="Green Box Nodes" />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <NodeList initialNodes={nodes} />
      </main>
    </MainLayout>
  );
}
