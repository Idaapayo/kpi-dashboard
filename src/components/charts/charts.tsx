import { useDataContext } from '@/components/providers/data-provider';

export default function Charts() {
    const { sales, expenses, regions, customers } = useDataContext();
    return (
        <div>
            <p>Hello</p>
        </div>
    );
}
