export interface MessagingAdapter {
  sendMessage<T>(event: string, data: T): Promise<void>
  process(event: string, handle: any): void
}
