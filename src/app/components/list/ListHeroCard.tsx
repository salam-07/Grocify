import { useGroceryStore } from '@/store/grocery-store';
import { Text, View } from 'react-native';

const ListHeroCard = () => {
    const { items } = useGroceryStore();

    const completedCount = items.filter(item => item.purchased).length;
    const pendingCount = items.length - completedCount;
    const completionRate = items.length ? Math.round((completedCount / items.length) * 100) : 0;

    return (
        <View className='rounded-3xl bg-primary p-5'>
            <Text className='text-sm font-semibold uppercase tracking-[1px] text-background'>
                Today
            </Text>

            <Text className="mt-1 text-3xl font-extrabold text-background/70">
                Your Grocery Board
            </Text>

            <Text className="mt-1 text-sm text-background">
                {completedCount} completed · {pendingCount} pending
            </Text>

            <View className="mt-4 overflow-hidden rounded-full bg-white/50">
                <View className="h-2 rounded-full bg-secondary" style={{ width: `${completionRate}%` }} />
            </View>
        </View>
    );
};

export default ListHeroCard;