declare module "js-cord" {

    import {} from "discord-api-types";
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
    }

    type shard = Map<number, Shard>;

    type errors = "EMPTY_OPTIONS" | "EMPTY_TOKEN";

    type colors = "RED" | "ORANGE" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "GREY";

    export class Shard {
        client: Client;
        id: number;
        initShard();
    }

    export class Base {
        id: string;
    }

    export class ShardManager {
        initShard(id: number);
    }

    export class Client {
        sendMessage(id: string, content: MessageOptions): Promise<Message>;
    }

    export class Message extends Base {
        client: Client;
        channel: GenericChannel;
        content: string;
    }

    export class GenericChannel extends Base {
        client: Client;
        sendMessage(content: MessageOptions): Promise<Message>;
    }
}