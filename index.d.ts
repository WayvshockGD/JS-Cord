declare module "js-cord" {

    import { APIActionRowComponent, APIChannel, APIGuild, APIMessage } from "discord-api-types";
    import { EventEmitter } from "eventemitter3";
    import { ClientOptions as WebSocketOptions } from "ws";
    
    interface ClientOptions {
        gateway?: {
            shards?: number;
            intents?: number;
        };
        debug?: boolean;
        websocketOptions?: WebSocketOptions;
        presence?: {
            mobile?: boolean;
        };
    }

    interface GatewayData {
        url: string;
        shards: number;
        session_start_limit: {
            total: number;
            remaining: number;
            reset_after: number;
            max_concurrency: number;
        };
    }

    interface EmbedField {
        name: string;
        value: string;
        inline: boolean;
    }

    interface EmbedFooter {
        text: string;
        image_url: string;
    }

    interface Embed {
        title: string;
        description: string;
        color: number | colors;
        footer: EmbedFooter;
        fields: EmbedField[];
    }

    interface MessageOptions {
        content: string;
        embeds: Embed[];
        components: APIActionRowComponent[];
    }

    interface Constants {
        gatewayVersion: string;
        intents: {
            guilds: 1;
            guildMembers: 2;
            guildBans: 4;
            guildEmojisAndStickers: 8;
            guildIntegrations: 16;
            guildWebhooks: 32;
            guildInvites: 64;
            guildVoiceStates: 128;
            guildPresences: 256;
            guildMessages: 512;
            guildMessageReactions: 1024;
            guildMessageTyping: 2048;
            directMessages: 4096;
            directMessageReactions: 8192;
            directMessageTyping: 16384;
        }
    }

    interface ClientEvents<T> {
        (event: "ready", listener: () => void): T;
        (event: "messageEvent", listener: (message: Message) => void): T;
        (event: "guildCreateEvent", listener: (guild: APIGuild) => void): T;
    }

    type shard = Collection<number, Shard>;
    type guild = Collection<string, APIGuild>;
    type channel = Collection<string, APIChannel>;

    type errors = "EMPTY_OPTIONS" | "EMPTY_TOKEN";

    type colors = "RED" | "ORANGE" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "GREY";

    type presences = "ONLINE" | "IDLE" | "DND";

    type channels = GuildChannel;

    export class Shard {
        client: Client;
        id: number;
        initShard();
    }

    export class Base {
        id: string;
        client: Client;
        json(props: string[]): {};
    }

    export class ShardManager {
        constructor(client: Client);
        initShard(id: number, url: string);
    }

    export class ChannelManager {
        static init(data: APIChannel, client: Client): channels;
    }

    export class Client extends EventEmitter {
        on: ClientEvents<this>;

        getGuild(id: string): APIGuild;
        deleteMessage(channelID: string, messageID: string);
        sendMessage(id: string, content: MessageOptions): Promise<Message>;
    }

    export class Member extends Base {}

    export class Message extends Base {
        constructor(data: APIMessage, client: Client);
        channel: channels;
        content: string;

        deleteContent(time?: number);
    }

    export class Guild {
        id: string;
        constructor(id: string, client: Client);
        json(): {};
    }

    export class GuildChannel extends Base {
        nsfw: boolean;
        name: string;
        constructor(data: APIChannel, client: Client);
        
        sendMessage(content: MessageOptions): Promise<Message>;
        toString(): string;
    }

    export class Collection<K, V> extends Map<K, V> {
        public getFirst(): V | false;
        public toJSON(): { [key: string]: V };
    }
}