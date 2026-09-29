import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { artwork, dishes, events } from '../data/catalog';
import {
  Button,
  Card,
  colors,
  Empty,
  Hero,
  Label,
  money,
  Page,
  Title,
} from '../components/ui';
import { RootStackParams } from '../navigation/types';
import { useLayout } from '../hooks/useLayout';
import { useApp } from '../store/AppStore';
import { TicketQR } from './Tickets';
type Nav = { navigation: NativeStackNavigationProp<RootStackParams> };
export function Home({ navigation }: Nav) {
  const { narrow, compact, padding, width } = useLayout();
  const insets = useSafeAreaInsets();
  return (
    <Page topInset={false}>
      <View
        style={[
          homeStyles.banner,
          {
            minHeight: (compact ? 245 : 260) + insets.top,
            marginHorizontal: -padding,
            marginTop: -padding,
          },
        ]}
      >
        <Image
          source={artwork.entrance}
          resizeMode="cover"
          style={[
            homeStyles.bannerImage,
            {
              height: (Math.min(width, 680) * 852) / 394,
              top: -Math.min(width, 680) * 0.34,
            },
          ]}
        />
        <LinearGradient
          pointerEvents="none"
          colors={['#0c031b45', '#0c031b55', '#0c031bd9', colors.bg]}
          locations={[0, 0.38, 0.76, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[
            homeStyles.bannerContent,
            { paddingHorizontal: padding, paddingTop: insets.top + 85 },
          ]}
        >
          <Label style={homeStyles.openLabel}>● OPEN TODAY</Label>
          <View>
            <Label
              style={[
                homeStyles.welcome,
                compact && { fontSize: 25, lineHeight: 30 },
              ]}
            >
              Welcome to
            </Label>
            <Label
              style={[
                homeStyles.welcome,
                homeStyles.zooName,
                compact && { fontSize: 25, lineHeight: 30 },
              ]}
            >
              Win Beast Zoo
            </Label>
          </View>
          <Label muted>Organized by Win Beast Casino</Label>
        </View>
      </View>
      <Title small>Quick Access</Title>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {[
          { label: 'Events', icon: '🎪', tab: 'Events' },
          { label: 'Food Court', icon: '🍔', tab: 'Food' },
          { label: 'Zoo Map', icon: '🗺️', tab: 'Map' },
          { label: 'Zoo Chat', icon: '💬', tab: 'Chat' },
          { label: 'Tickets', icon: '🎟️', tab: 'Tickets' },
          { label: 'Profile', icon: '👤', tab: 'Profile' },
        ].map(item => (
          <Pressable
            key={item.label}
            onPress={() => {
              if (item.tab === 'Tickets') {
                navigation.navigate('Tickets');
              } else {
                (navigation as any).navigate(item.tab);
              }
            }}
            style={{
              width: narrow ? '46%' : '31%',
              flexGrow: 1,
              padding: 14,
              alignItems: 'center',
              gap: 10,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 18,
            }}
          >
            <Label style={{ fontSize: 27, lineHeight: 34 }}>{item.icon}</Label>
            <Label muted style={{ fontSize: 12 }}>
              {item.label}
            </Label>
          </Pressable>
        ))}
      </View>
      <Title small>Discover Zoo Experiences</Title>
      <Hero
        image={events[0].image}
        title={events[0].name}
        subtitle="MEET THE KEEPERS · VIEW EVENT →"
        onPress={() => navigation.navigate('Event', { id: events[0].id })}
      />
      <View style={{ flexDirection: narrow ? 'column' : 'row', gap: 12 }}>
        <Card style={{ flex: 1 }}>
          <Label style={{ color: colors.green }}>◷ Opening Hours</Label>
          <Title small>9 AM – 6 PM</Title>
          <Label muted>Gates close 5:30 PM</Label>
        </Card>
        <Card style={{ flex: 1 }}>
          <Label style={{ color: colors.purple }}>★ Featured</Label>
          <Title small>African Lions</Title>
          <Label muted>Explore Lion Territory</Label>
        </Card>
      </View>
      <Card>
        <Label style={{ color: '#f8ce37' }}>🦒 Did You Know?</Label>
        <Label muted>
          A giraffe’s tongue can reach around 18 inches and is dark purple!
        </Label>
      </Card>
      <Card>
        <Label style={{ color: colors.green }}>💡 VISITOR TIP</Label>
        <Label muted>
          Arrive early at feeding shows for the best viewing spots. Check Events
          for schedule information and plan your visit.
        </Label>
      </Card>
      <Title small>A Taste of Adventure</Title>
      <Hero
        image={dishes[6].image}
        title={dishes[6].name}
        subtitle={`${money(dishes[6].price)} · ${
          dishes[6].time
        } min prep · ORDER →`}
        onPress={() => navigation.navigate('Dish', { id: dishes[6].id })}
      />
    </Page>
  );
}
export function Profile({ navigation }: Nav) {
  const { state } = useApp();
  return (
    <Page>
      <Pressable
        onPress={() => navigation.navigate('Settings')}
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          paddingVertical: 18,
        }}
      >
        <LinearGradient
          colors={[colors.green, colors.purple]}
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Label style={{ fontSize: 30, lineHeight: 40 }}>🦁</Label>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Title small>{state.visitorName || 'Zoo Visitor'}</Title>
          <Label muted>Win Beast Zoo Guest</Label>
        </View>
        <Label muted>Edit ›</Label>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: 12,
          alignItems: 'center',
        }}
      >
        <Title small>My Tickets</Title>
        {!!state.tickets.length && (
          <Pressable onPress={() => navigation.navigate('Tickets')}>
            <Label style={{ color: colors.green }}>+ Add More</Label>
          </Pressable>
        )}
      </View>
      {state.tickets.length ? (
        state.tickets.map(ticket => (
          <Pressable
            key={ticket.id}
            onPress={() => navigation.navigate('Ticket', { id: ticket.id })}
          >
            <Card>
              <Label
                style={{ color: colors.green, fontSize: 12, letterSpacing: 1 }}
              >
                WIN BEAST ZOO
              </Label>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  rowGap: 12,
                }}
              >
                <Title small>{ticket.kind} Ticket × 1</Title>
                <Label
                  style={{
                    color: colors.green,
                    fontSize: 20,
                    fontWeight: '900',
                  }}
                >
                  {money(ticket.price)}
                </Label>
              </View>
              <Label muted>Registered · Tap to view QR</Label>
              <TicketQR ticket={ticket} />
            </Card>
          </Pressable>
        ))
      ) : (
        <Empty
          emoji="🎟️"
          title="No tickets yet"
          text="Choose tickets and keep your QR codes together."
        >
          <Button
            title="Choose Tickets"
            onPress={() => navigation.navigate('Tickets')}
          />
        </Empty>
      )}
      <Title small>Zoo Information</Title>
      <Card>
        <Label muted>◷ OPENING HOURS</Label>
        <Label>9:00 AM – 6:00 PM daily{'\n'}Gates close at 5:30 PM</Label>
      </Card>
      <Card>
        <Label muted>♿ ACCESSIBILITY</Label>
        <Label>
          Ask zoo staff about accessible routes, mobility assistance, and quiet
          areas. Add accessibility requests to your event notes.
        </Label>
      </Card>
      <Card>
        <Label muted>🌿 RESPECT THE WILD</Label>
        <Label>
          Stay on visitor paths, keep a safe distance, and only feed animals
          during supervised activities.
        </Label>
      </Card>
    </Page>
  );
}

const homeStyles = StyleSheet.create({
  banner: { justifyContent: 'flex-end', overflow: 'hidden', marginBottom: 0 },
  bannerImage: { position: 'absolute', left: 0, width: '100%' },
  bannerContent: { paddingBottom: 18, gap: 6 },
  openLabel: { color: colors.green, fontSize: 12, letterSpacing: 0.6 },
  welcome: { fontSize: 28, lineHeight: 32, fontWeight: '900' },
  zooName: { color: colors.green },
});
