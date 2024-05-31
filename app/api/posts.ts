import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '../../../lib/posts'; // Adjust the import based on your project structure

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  
  const { posts, totalPages } = await getPosts(page, limit);

  return NextResponse.json({
    posts,
    totalPages,
    currentPage: page,
  });
}