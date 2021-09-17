declare module "js-cord" {

    import { APIActionRowComponent, APIChannel, APIChannelMention, APIGuild, APIGuildMember, APIMessage } from "discord-api-types";
    import { EventEmitter } from "eventemitter3";
    import { ClientOptions as WebSocketOptions } from "ws";
    import BaseCollection from "@jscord/collection";
    
    interface ClientOptions {
        gateway?: {
            shards?: number;
            intents?: number | intentStrings;
        };
        debug?: boolean;
        websocketOptions?: WebSocketOptions;
        image?: {
            size?: number;
            format?: formats;
        }
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

    interface MentionManagerParams {
        roles: APIMessage["mention_roles"];
        channels: APIMessage["mention_channels"];
        members: APIMessage["mentions"];
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

    type memberMentions = Collection<string, APIGuildMember>;
    
    type channelMentions = Collection<string, APIChannelMention>;

    type roleMentions = Collection<string, string[]>;

    type shard = Collection<string, Shard>;

    type guild = Collection<string, APIGuild>;

    type channel = Collection<string, APIChannel>;

    type intentStrings = Array<keyof Constants["intents"]>;

    type errors = "EMPTY_OPTIONS" | "EMPTY_TOKEN" | "INVALID_FORMAT" | "INVALID_SIZE" | "INVALID_COLOR";

    type colors = "RED" | "ORANGE" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "GREY";

    type presences = "ONLINE" | "IDLE" | "DND";

    type formats = "PNG" | "JPEG" | "GIF";

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

    export class MentionManager {
        constructor(data: MentionManagerParams);
        get role(): roleMentions;
        get channel(): channelMentions;
        get member(): memberMentions;
    }

    export class ChannelManager {
        static init(data: APIChannel, client: Client): channels;
    }

    export class Client extends EventEmitter {
        on: ClientEvents<this>;

        getGuild(id: string): APIGuild;
        deleteMessage(channelID: string, messageID: string);
        sendMessage(id: string, content: MessageOptions): Promise<Message>;
        format(url: string): string;
    }

    export class Member extends Base {}

    export class Message extends Base {
        constructor(data: APIMessage, client: Client);
        channel: channels;
        guild: Guild;
        content: string;
        mentions: MentionManager;

        deleteContent(time?: number);
    }

    export class Guild {
        id: string;
        icon: string;
        memberCount: number;
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

    export class Collection<K extends string, V> extends BaseCollection<K, V> {}
}