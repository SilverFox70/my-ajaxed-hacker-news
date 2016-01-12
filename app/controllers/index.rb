get '/' do
  redirect '/posts'
end

get '/posts' do
  @posts = Post.all
  erb :index
end

get '/posts/:id/vote' do
  post = Post.find(params[:id])
  post.votes.create(value: 1)
  return {points: post.points, post_number: params[:id]}.to_json
end

delete '/posts/:id' do
  post = Post.find(params[:id])
  post.destroy
  {post_number: params[:id]}.to_json
end

post '/posts' do
  @new_post = Post.create( title: params[:title],
               username: Faker::Internet.user_name,
               comment_count: rand(1000) )
  erb :_article, layout: false
end

get '/post/:id' do
  @post = Post.find(params[:id])
  erb :post
end
