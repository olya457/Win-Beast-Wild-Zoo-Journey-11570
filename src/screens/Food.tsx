import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  Card,
  Counter,
  colors,
  Empty,
  Field,
  Hero,
  Label,
  money,
  Page,
  Row,
  Segments,
  Success,
  Title,
} from '../components/ui';
import { categories, dishes } from '../data/catalog';
import { RootStackParams, ScreenProps } from '../navigation/types';
import { CartItem, uid, useApp } from '../store/AppStore';
export const cartTotal = (items: CartItem[]) =>
  items.reduce(
    (sum, item) =>
      sum +
      Math.round(dishes.find(d => d.id === item.dishId)!.price * 100) *
        item.quantity,
    0,
  ) / 100;
export function Food({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParams>;
}) {
  const [tab, setTab] = useState('Menu');
  const [category, setCategory] = useState(categories[0]);
  const { state, update } = useApp();
  const add = (dishId: string) =>
    update(s => {
      const old = s.cart.find(i => i.dishId === dishId && !i.note);
      return {
        ...s,
        cart: old
          ? s.cart.map(i =>
              i.id === old.id
                ? { ...i, quantity: Math.min(99, i.quantity + 1) }
                : i,
            )
          : [...s.cart, { id: uid(), dishId, quantity: 1, note: '' }],
      };
    }).catch(() => {});
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Page title="Food Court" animationKey={`${tab}-${category}`}>
        <Segments items={['Menu', 'My Orders']} value={tab} onChange={setTab} />
        {tab === 'Menu' ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {categories.map(c => (
                <Pressable
                  key={c}
                  onPress={() => setCategory(c)}
                  style={{
                    backgroundColor:
                      c === category ? colors.green : colors.card,
                    padding: 10,
                    borderRadius: 20,
                  }}
                >
                  <Label
                    style={{
                      color: c === category ? colors.bg : colors.muted,
                      fontSize: 12,
                    }}
                  >
                    {c}
                  </Label>
                </Pressable>
              ))}
            </ScrollView>
            {dishes
              .filter(d => d.category === category)
              .map(d => (
                <Card key={d.id} style={{ padding: 0, overflow: 'hidden' }}>
                  <Hero
                    image={d.image}
                    title={d.name}
                    onPress={() => navigation.navigate('Dish', { id: d.id })}
                  />
                  <View style={{ padding: 14, gap: 12 }}>
                    <Label muted>{d.description}</Label>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        rowGap: 12,
                        alignItems: 'center',
                      }}
                    >
                      <View>
                        <Label
                          style={{
                            color: colors.green,
                            fontWeight: '900',
                            fontSize: 19,
                          }}
                        >
                          {money(d.price)}
                        </Label>
                        <Label muted>◷ {d.time} min</Label>
                      </View>
                      <Button
                        title="+ Add"
                        onPress={() => {
                          add(d.id);
                        }}
                      />
                    </View>
                  </View>
                </Card>
              ))}
          </>
        ) : state.orders.length ? (
          state.orders.map(order => (
            <Pressable
              key={order.id}
              onPress={() => navigation.navigate('Order', { id: order.id })}
            >
              <Card>
                <Title small>Order #{order.id.slice(-6).toUpperCase()}</Title>
                <Row
                  label={new Date(order.createdAt).toLocaleString()}
                  value={order.status}
                />
                <Row
                  label={money(order.total)}
                  value={`◷ ${order.minutes} min estimate`}
                />
              </Card>
            </Pressable>
          ))
        ) : (
          <Empty
            emoji="🍽️"
            title="No orders yet"
            text="Choose something delicious from the menu."
          />
        )}
      </Page>
      {state.cart.length > 0 && tab === 'Menu' && (
        <View
          style={{ padding: 12, borderTopWidth: 1, borderColor: colors.line }}
        >
          <Button
            title={`View Cart (${state.cart.reduce(
              (a, i) => a + i.quantity,
              0,
            )}) — ${money(cartTotal(state.cart))}`}
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
      )}
    </View>
  );
}
export function DishDetail({ navigation, route }: ScreenProps<'Dish'>) {
  const dish = dishes.find(d => d.id === route.params.id)!;
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const { update } = useApp();
  const add = async () => {
    if (busy) {
      return;
    }
    setBusy(true);
    try {
      await update(s => ({
        ...s,
        cart: [
          ...s.cart,
          { id: uid(), dishId: dish.id, quantity, note: note.trim() },
        ],
      }));
      navigation.goBack();
    } finally {
      setBusy(false);
    }
  };
  return (
    <Page back={() => navigation.goBack()}>
      <Hero image={dish.image} title={dish.name} height={260} />
      <Label style={{ color: colors.green, fontSize: 21, fontWeight: '900' }}>
        {money(dish.price)} <Label muted> · ◷ {dish.time} min</Label>
      </Label>
      <Label muted>{dish.description}</Label>
      <Title small>Ingredients</Title>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {dish.ingredients
          .replace(/\.$/, '')
          .split(', ')
          .map(i => (
            <View
              key={i}
              style={{
                padding: 8,
                borderRadius: 15,
                backgroundColor: colors.card,
              }}
            >
              <Label muted>{i}</Label>
            </View>
          ))}
      </View>
      <Field
        value={note}
        onChange={setNote}
        placeholder="Dish note (optional)"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: 12,
          alignItems: 'center',
        }}
      >
        <Title small>Quantity</Title>
        <Counter min={1} value={quantity} onChange={setQuantity} />
      </View>
      <Button
        title={`Add ${quantity} to Cart — ${money(dish.price * quantity)}`}
        busy={busy}
        onPress={() => {
          add().catch(() => {});
        }}
      />
    </Page>
  );
}
export function Cart({ navigation }: ScreenProps<'Cart'>) {
  const { state, update } = useApp();
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const total = cartTotal(state.cart);
  const change = (id: string, quantity: number) => {
    update(s => ({
      ...s,
      cart: s.cart.map(i => (i.id === id ? { ...i, quantity } : i)),
    })).catch(() => {});
  };
  const place = async () => {
    if (busy || !state.cart.length) {
      return;
    }
    setBusy(true);
    try {
      const id = uid();
      await update(s => {
        if (!s.cart.length) {
          throw new Error('Cart is empty');
        }
        return {
          ...s,
          orders: [
            {
              id,
              items: s.cart,
              total: cartTotal(s.cart),
              minutes: Math.max(
                ...s.cart.map(
                  i => dishes.find(d => d.id === i.dishId)!.minutes,
                ),
              ),
              note: note.trim(),
              createdAt: new Date().toISOString(),
              status: 'Saved locally',
            },
            ...s.orders,
          ],
          cart: [],
        };
      });
      navigation.replace('Order', { id, success: true });
    } finally {
      setBusy(false);
    }
  };
  return (
    <Page back={() => navigation.goBack()} title="Your Cart">
      {state.cart.length ? (
        <>
          {state.cart.map(item => {
            const dish = dishes.find(d => d.id === item.dishId)!;
            return (
              <Card key={item.id}>
                <Title small>{dish.name}</Title>
                <Row
                  label={money(dish.price)}
                  value={money(dish.price * item.quantity)}
                />
                <Counter
                  min={1}
                  value={item.quantity}
                  onChange={v => change(item.id, v)}
                />
                {!!item.note && <Label muted>{item.note}</Label>}
                <Pressable
                  onPress={() => {
                    update(s => ({
                      ...s,
                      cart: s.cart.filter(i => i.id !== item.id),
                    })).catch(() => {});
                  }}
                >
                  <Label style={{ color: '#ff7896' }}>Remove</Label>
                </Pressable>
              </Card>
            );
          })}
          <Field
            value={note}
            onChange={setNote}
            placeholder="Order note (optional)"
          />
          <Card>
            <Row label="Total" value={money(total)} />
            <Label muted>
              Orders are saved on your device. Show your order to the food court
              team to confirm preparation.
            </Label>
          </Card>
          <Button
            title={`Save Order — ${money(total)}`}
            busy={busy}
            onPress={() => {
              place().catch(() => {});
            }}
          />
        </>
      ) : (
        <Empty
          emoji="🛒"
          title="Your cart is empty"
          text="Add dishes from the Food Court menu."
        />
      )}
    </Page>
  );
}
export function OrderDetail({ navigation, route }: ScreenProps<'Order'>) {
  const { state, update } = useApp();
  const order = state.orders.find(o => o.id === route.params.id);
  if (!order) {
    return <Page back={() => navigation.goBack()} title="Order not found" />;
  }
  const cancel = () =>
    Alert.alert(
      'Cancel order?',
      'Your saved order will be marked as cancelled.',
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Cancel order',
          style: 'destructive',
          onPress: () => {
            update(s => ({
              ...s,
              orders: s.orders.map(o =>
                o.id === order.id ? { ...o, status: 'Cancelled' } : o,
              ),
            })).catch(() => {});
          },
        },
      ],
    );
  const details = (
    <>
      <Card>
        <Row label="Order #" value={order.id.slice(-6).toUpperCase()} />
        <Row
          label="Created"
          value={new Date(order.createdAt).toLocaleString()}
        />
        <Row label="Status" value={order.status} />
        <Row label="Estimated preparation" value={`${order.minutes} minutes`} />
        {order.items.map(i => (
          <View key={i.id}>
            <Row
              label={`${dishes.find(d => d.id === i.dishId)!.name} × ${
                i.quantity
              }`}
              value={money(
                dishes.find(d => d.id === i.dishId)!.price * i.quantity,
              )}
            />
            {!!i.note && <Label muted>{i.note}</Label>}
          </View>
        ))}
        <Row label="Total" value={money(order.total)} />
        {!!order.note && <Label muted>{order.note}</Label>}
      </Card>
      <Label muted>
        Preparation and pickup status must be confirmed with food court staff.
      </Label>
      {order.status !== 'Cancelled' && (
        <Button title="Cancel Order" secondary onPress={cancel} />
      )}
      <Button
        title="Back to Food Court"
        onPress={() => navigation.popTo('Main')}
      />
    </>
  );
  return (
    <Page back={() => navigation.goBack()}>
      {route.params.success ? (
        <Success
          title="Order Saved!"
          subtitle="Show your order to the food court team"
        >
          {details}
        </Success>
      ) : (
        <>
          <Title>Your Order</Title>
          {details}
        </>
      )}
    </Page>
  );
}
